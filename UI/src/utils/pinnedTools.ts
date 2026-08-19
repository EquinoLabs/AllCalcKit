/**
 * Pinned (Favorite) Tools and Recent Activity Manager
 * Persists user's favorite calculators and recent tool visits in localStorage.
 */

export interface RecentToolItem {
  id: string;
  name: string;
  url: string;
  category: string;
  timestamp: number;
}

const PINNED_STORAGE_KEY = 'ack_pinned_tools';
const RECENT_STORAGE_KEY = 'ack_recent_tools';
const MAX_RECENT_ITEMS = 6;

/**
 * Retrieve list of pinned calculator IDs
 */
export function getPinnedTools(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PINNED_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Check if a specific calculator is pinned
 */
export function isToolPinned(id: string): boolean {
  return getPinnedTools().includes(id);
}

/**
 * Toggle pin status for a calculator ID
 * @returns boolean new pinned state
 */
export function togglePinTool(id: string): boolean {
  if (typeof window === 'undefined' || !id) return false;
  try {
    const current = getPinnedTools();
    const index = current.indexOf(id);
    let isPinned = false;

    if (index > -1) {
      current.splice(index, 1);
      isPinned = false;
    } else {
      current.push(id);
      isPinned = true;
    }

    localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(current));
    window.dispatchEvent(new CustomEvent('ack_pinned_change', { detail: { id, isPinned, pinned: current } }));
    return isPinned;
  } catch {
    return false;
  }
}

/**
 * Retrieve list of recently visited calculators
 */
export function getRecentTools(): RecentToolItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Record a visit to a calculator
 */
export function recordRecentTool(item: Omit<RecentToolItem, 'timestamp'>): void {
  if (typeof window === 'undefined' || !item.id) return;
  try {
    const current = getRecentTools().filter(t => t.id !== item.id);
    current.unshift({
      ...item,
      timestamp: Date.now()
    });

    const truncated = current.slice(0, MAX_RECENT_ITEMS);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(truncated));
    window.dispatchEvent(new CustomEvent('ack_recent_change', { detail: truncated }));
  } catch {
    // Ignore storage quota errors
  }
}
