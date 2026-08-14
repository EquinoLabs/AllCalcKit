import { describe, it, expect, beforeEach } from 'vitest';
import {
  utf8ToBase64Url,
  base64UrlToUtf8,
  serializeGroupForShare,
  deserializeGroupFromShare,
  generateGroupShareUrl,
  detectGroupConflict,
  importGroupIntoStorage
} from '../../src/utils/moneySplit/sharing';
import { loadAllGroups, loadGroupById } from '../../src/utils/moneySplit/persistence';
import type { Group } from '../../src/utils/moneySplit/types';

class MockLocalStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] !== undefined ? this.store[key] : null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

describe('Money Split Sharing & URL Serialization Engine', () => {
  beforeEach(() => {
    (global as any).localStorage = new MockLocalStorage();
    (global as any).window = { location: { origin: 'https://allcalckit.com' } };
  });

  const sampleGroup: Group = {
    id: 'grp_123',
    name: '🏖 Goa Trip 2026',
    currency: 'INR',
    version: 1,
    createdAt: 1700000000000,
    updatedAt: 1700000000000,
    participants: [
      { id: 'p1', name: 'Lakshya' },
      { id: 'p2', name: 'राहुल' } // Hindi characters
    ],
    expenses: [
      {
        id: 'exp_1',
        description: 'Dinner & Drinks 🍕',
        amount: 2500.50,
        paidBy: 'p1',
        participantIds: ['p1', 'p2'],
        splitMethod: 'equal',
        allocations: [],
        createdAt: 1700000010000,
        updatedAt: 1700000010000
      }
    ]
  };

  describe('Unicode & Base64 URL Encoding', () => {
    it('encodes and decodes multi-language Unicode strings without data loss', () => {
      const text = 'Goa Trip 🏖 — राहुल & Ananya (₹5,000 / €60)';
      const encoded = utf8ToBase64Url(text);
      expect(encoded).not.toContain('+');
      expect(encoded).not.toContain('/');
      expect(encoded).not.toContain('=');

      const decoded = base64UrlToUtf8(encoded);
      expect(decoded).toBe(text);
    });
  });

  describe('Group Serialization & Deserialization', () => {
    it('serializes and deserializes a complete group payload with schema version', () => {
      const encoded = serializeGroupForShare(sampleGroup);
      expect(encoded).toBeTruthy();

      const result = deserializeGroupFromShare(encoded);
      expect(result.success).toBe(true);
      expect(result.payload?.v).toBe(1);

      const group = result.payload!.group;
      expect(group.id).toBe('grp_123');
      expect(group.name).toBe('🏖 Goa Trip 2026');
      expect(group.currency).toBe('INR');
      expect(group.participants).toHaveLength(2);
      expect(group.participants[1].name).toBe('राहुल');
      expect(group.expenses).toHaveLength(1);
      expect(group.expenses[0].amount).toBe(2500.50);
      expect(group.expenses[0].description).toBe('Dinner & Drinks 🍕');
    });

    it('generates a full shareable URL with ?data query parameter', () => {
      const url = generateGroupShareUrl(sampleGroup, 'https://allcalckit.com');
      expect(url).toContain('https://allcalckit.com/finance/money-split?data=');
    });

    it('handles corrupted, empty, or non-JSON payloads gracefully without throwing', () => {
      expect(deserializeGroupFromShare('').success).toBe(false);
      expect(deserializeGroupFromShare('invalid!!!base64').success).toBe(false);
      expect(deserializeGroupFromShare(utf8ToBase64Url('plain text not json')).success).toBe(false);
      expect(deserializeGroupFromShare(utf8ToBase64Url(JSON.stringify({ notGroup: 1 }))).success).toBe(false);
    });
  });

  describe('Conflict Detection & Import Modes', () => {
    it('detects conflict when an existing group has matching ID or name', () => {
      const existing: Group[] = [sampleGroup];

      const sameIdGroup: Group = { ...sampleGroup, name: 'Different Name' };
      expect(detectGroupConflict(existing, sameIdGroup).hasConflict).toBe(true);

      const sameNameGroup: Group = { ...sampleGroup, id: 'different_id' };
      expect(detectGroupConflict(existing, sameNameGroup).hasConflict).toBe(true);

      const differentGroup: Group = { ...sampleGroup, id: 'new_id', name: 'Manali Trip' };
      expect(detectGroupConflict(existing, differentGroup).hasConflict).toBe(false);
    });

    it('imports group in replace mode', () => {
      const imported = importGroupIntoStorage(sampleGroup, 'replace');
      expect(imported.id).toBe(sampleGroup.id);
      expect(loadGroupById(sampleGroup.id)).toBeDefined();
    });

    it('imports group in duplicate mode with fresh IDs and (Copy) suffix', () => {
      const imported = importGroupIntoStorage(sampleGroup, 'duplicate');
      expect(imported.id).not.toBe(sampleGroup.id);
      expect(imported.name).toBe('🏖 Goa Trip 2026 (Copy)');
      expect(imported.participants[0].id).not.toBe(sampleGroup.participants[0].id);
      expect(imported.expenses[0].paidBy).toBe(imported.participants[0].id);
    });
  });
});
