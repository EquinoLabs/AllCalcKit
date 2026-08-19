import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getPinnedTools, isToolPinned, togglePinTool, getRecentTools, recordRecentTool } from '../../src/utils/pinnedTools';

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

const mockStorage = new MockLocalStorage();
// @ts-expect-error mock window & storage
globalThis.window = {
  dispatchEvent: vi.fn(),
  localStorage: mockStorage
};
globalThis.localStorage = mockStorage as unknown as Storage;
globalThis.CustomEvent = class CustomEvent {
  type: string;
  detail: any;
  constructor(type: string, params?: { detail?: any }) {
    this.type = type;
    this.detail = params?.detail;
  }
} as any;

describe('Pinned & Recent Tools Manager', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  describe('Pinned Tools', () => {
    it('returns empty array when nothing is pinned', () => {
      expect(getPinnedTools()).toEqual([]);
      expect(isToolPinned('loan-emi')).toBe(false);
    });

    it('toggles pin state on and off', () => {
      const pin1 = togglePinTool('loan-emi');
      expect(pin1).toBe(true);
      expect(isToolPinned('loan-emi')).toBe(true);
      expect(getPinnedTools()).toContain('loan-emi');

      const pin2 = togglePinTool('loan-emi');
      expect(pin2).toBe(false);
      expect(isToolPinned('loan-emi')).toBe(false);
      expect(getPinnedTools()).not.toContain('loan-emi');
    });

    it('handles multiple pinned items', () => {
      togglePinTool('bmi');
      togglePinTool('sip');
      togglePinTool('percentage');

      const pinned = getPinnedTools();
      expect(pinned.length).toBe(3);
      expect(pinned).toEqual(['bmi', 'sip', 'percentage']);
    });
  });

  describe('Recent Tools', () => {
    it('records and retrieves recent tool visits in reverse chronological order', () => {
      recordRecentTool({ id: 'bmi', name: 'BMI Calculator', url: '/health/bmi', category: 'Health' });
      recordRecentTool({ id: 'sip', name: 'SIP Calculator', url: '/finance/sip', category: 'Finance' });

      const recents = getRecentTools();
      expect(recents.length).toBe(2);
      expect(recents[0].id).toBe('sip');
      expect(recents[1].id).toBe('bmi');
    });

    it('deduplicates existing entries when revisited', () => {
      recordRecentTool({ id: 'bmi', name: 'BMI Calculator', url: '/health/bmi', category: 'Health' });
      recordRecentTool({ id: 'sip', name: 'SIP Calculator', url: '/finance/sip', category: 'Finance' });
      recordRecentTool({ id: 'bmi', name: 'BMI Calculator', url: '/health/bmi', category: 'Health' });

      const recents = getRecentTools();
      expect(recents.length).toBe(2);
      expect(recents[0].id).toBe('bmi');
      expect(recents[1].id).toBe('sip');
    });

    it('caps recent tools at maximum 6 entries', () => {
      for (let i = 1; i <= 10; i++) {
        recordRecentTool({ id: `tool-${i}`, name: `Tool ${i}`, url: `/calc/${i}`, category: 'General' });
      }

      const recents = getRecentTools();
      expect(recents.length).toBe(6);
      expect(recents[0].id).toBe('tool-10');
    });
  });
});
