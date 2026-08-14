/**
 * Money Split Sharing & URL Serialization Engine (dev-v.1.1)
 * Encodes/decodes entire group models into URL-safe strings using standard browser APIs.
 * Supports full Unicode (emojis, multi-language names) without third-party dependencies.
 */

import type { Group, SharePayload } from './types';
import { SCHEMA_VERSION, saveGroup, loadAllGroups, setActiveGroupId, generateId } from './persistence';
import { shareResult, copyToClipboard } from '../share';

/**
 * Encodes a Unicode string to URL-safe Base64.
 */
export function utf8ToBase64Url(str: string): string {
  try {
    // UTF-8 binary encoding
    const utf8Bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    const base64 = btoa(binary);
    // Convert standard Base64 to URL-safe Base64
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (err) {
    console.error('[money-split] UTF-8 to Base64 conversion error:', err);
    return '';
  }
}

/**
 * Decodes a URL-safe Base64 string back to a Unicode string.
 */
export function base64UrlToUtf8(base64Url: string): string {
  try {
    // Revert URL-safe replacements
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  } catch (err) {
    console.error('[money-split] Base64 to UTF-8 conversion error:', err);
    return '';
  }
}

/**
 * Serializes a group object into an encoded URL-safe string.
 */
export function serializeGroupForShare(group: Group): string {
  const payload: SharePayload = {
    v: SCHEMA_VERSION,
    group: {
      id: group.id,
      name: group.name,
      currency: group.currency || 'INR',
      version: group.version || SCHEMA_VERSION,
      participants: group.participants || [],
      expenses: group.expenses || [],
      createdAt: group.createdAt || Date.now(),
      updatedAt: group.updatedAt || Date.now()
    }
  };

  const json = JSON.stringify(payload);
  return utf8ToBase64Url(json);
}

/**
 * Deserializes and validates a shared URL payload string.
 * Never throws on malformed input.
 */
export function deserializeGroupFromShare(
  encodedData: string
): { success: boolean; payload?: SharePayload; error?: string } {
  if (!encodedData || typeof encodedData !== 'string') {
    return { success: false, error: 'No share data provided.' };
  }

  const json = base64UrlToUtf8(encodedData.trim());
  if (!json) {
    return { success: false, error: 'Invalid or corrupt share link data.' };
  }

  try {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object') {
      return { success: false, error: 'Malformed share payload.' };
    }

    if (!parsed.group || typeof parsed.group !== 'object' || !parsed.group.name) {
      return { success: false, error: 'Invalid group structure in share payload.' };
    }

    const group: Group = {
      id: String(parsed.group.id || generateId()),
      name: String(parsed.group.name).trim(),
      currency: String(parsed.group.currency || 'INR').toUpperCase(),
      version: Number(parsed.group.version || SCHEMA_VERSION),
      participants: Array.isArray(parsed.group.participants) ? parsed.group.participants : [],
      expenses: Array.isArray(parsed.group.expenses) ? parsed.group.expenses : [],
      createdAt: Number(parsed.group.createdAt || Date.now()),
      updatedAt: Number(parsed.group.updatedAt || Date.now())
    };

    return {
      success: true,
      payload: {
        v: parsed.v || 1,
        group
      }
    };
  } catch (err) {
    return { success: false, error: 'Failed to parse shared group JSON.' };
  }
}

/**
 * Generates the full shareable URL for a group.
 */
export function generateGroupShareUrl(group: Group, origin?: string): string {
  const data = serializeGroupForShare(group);
  const basePath = '/finance/money-split';

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    return `${window.location.origin}${basePath}?data=${data}`;
  }

  const baseOrigin = origin || 'https://allcalckit.com';
  return `${baseOrigin}${basePath}?data=${data}`;
}

/**
 * Checks whether an incoming shared group conflicts with an existing local group.
 */
export function detectGroupConflict(
  existingGroups: Group[],
  incomingGroup: Group
): { hasConflict: boolean; matchingGroup?: Group } {
  // Check exact ID match first
  const matchById = existingGroups.find(g => g.id === incomingGroup.id);
  if (matchById) {
    return { hasConflict: true, matchingGroup: matchById };
  }

  // Check exact name match second
  const matchByName = existingGroups.find(
    g => g.name.toLowerCase() === incomingGroup.name.toLowerCase()
  );
  if (matchByName) {
    return { hasConflict: true, matchingGroup: matchByName };
  }

  return { hasConflict: false };
}

/**
 * Imports an incoming shared group into localStorage.
 * - 'replace': Overwrites the existing local group with incoming data.
 * - 'duplicate': Creates a separate new group with fresh IDs and appends "(Copy)".
 * - 'new': Saves directly as a new group.
 */
export function importGroupIntoStorage(
  incomingGroup: Group,
  mode: 'replace' | 'duplicate' | 'new'
): Group {
  let groupToSave: Group;

  if (mode === 'replace') {
    groupToSave = {
      ...incomingGroup,
      updatedAt: Date.now()
    };
  } else if (mode === 'duplicate') {
    const newId = generateId();
    // Re-map participant IDs to avoid collisions
    const participantIdMap = new Map<string, string>();
    const newParticipants = incomingGroup.participants.map(p => {
      const freshPId = generateId();
      participantIdMap.set(p.id, freshPId);
      return { id: freshPId, name: p.name };
    });

    const newExpenses = incomingGroup.expenses.map(e => ({
      ...e,
      id: generateId(),
      paidBy: participantIdMap.get(e.paidBy) || e.paidBy,
      participantIds: e.participantIds.map(pId => participantIdMap.get(pId) || pId),
      allocations: e.allocations.map(a => ({
        ...a,
        participantId: participantIdMap.get(a.participantId) || a.participantId
      }))
    }));

    groupToSave = {
      ...incomingGroup,
      id: newId,
      name: `${incomingGroup.name} (Copy)`,
      participants: newParticipants,
      expenses: newExpenses,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  } else {
    // mode === 'new'
    groupToSave = {
      ...incomingGroup,
      updatedAt: Date.now()
    };
  }

  saveGroup(groupToSave);
  setActiveGroupId(groupToSave.id);
  return groupToSave;
}

/**
 * Triggers native Web Share API or falls back to copying share link.
 */
export async function shareGroupLink(
  group: Group
): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'none'; message: string }> {
  const url = generateGroupShareUrl(group);
  return shareResult({
    title: `${group.name} — Money Split on All Calc Kit`,
    text: `View and collaborate on expenses for "${group.name}" on All Calc Kit:`,
    url
  });
}
