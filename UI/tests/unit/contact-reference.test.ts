import { describe, it, expect } from 'vitest';
import {
  generateSupportReference,
  isValidSupportReference,
  SUPPORT_REF_ALPHABET,
  SUPPORT_REF_REGEX,
} from '../../src/utils/reference';

describe('Support Reference Generator & Validator', () => {
  it('generates a reference matching the ACK-YYYYMMDD-RANDOM pattern', () => {
    const ref = generateSupportReference();
    expect(ref).toMatch(SUPPORT_REF_REGEX);
    expect(isValidSupportReference(ref)).toBe(true);
  });

  it('uses the provided date for the date component', () => {
    const fixedDate = new Date('2026-08-11T15:30:00Z');
    const ref = generateSupportReference(fixedDate);
    expect(ref.startsWith('ACK-20260811-')).toBe(true);
    expect(ref.length).toBe('ACK-20260811-'.length + 8);
  });

  it('contains only unambiguous characters (no I, O, 0, 1)', () => {
    const ambiguousChars = ['I', 'O', '0', '1'];
    for (const char of ambiguousChars) {
      expect(SUPPORT_REF_ALPHABET.includes(char)).toBe(false);
    }

    // Generate 100 references and verify none contain ambiguous characters
    for (let i = 0; i < 100; i++) {
      const ref = generateSupportReference();
      const randomPart = ref.split('-')[2];
      for (const char of ambiguousChars) {
        expect(randomPart.includes(char)).toBe(false);
      }
    }
  });

  it('generates unique references with high entropy across multiple iterations', () => {
    const generated = new Set<string>();
    const count = 200;

    for (let i = 0; i < count; i++) {
      const ref = generateSupportReference();
      expect(generated.has(ref)).toBe(false);
      generated.add(ref);
    }

    expect(generated.size).toBe(count);
  });

  it('validates correct support references and rejects invalid formats', () => {
    // Valid references
    expect(isValidSupportReference('ACK-20260811-X7K4P9QM')).toBe(true);
    expect(isValidSupportReference('ACK-20240101-ABCDEFGH')).toBe(true);
    expect(isValidSupportReference('ACK-20301231-98765432')).toBe(true);

    // Invalid references
    expect(isValidSupportReference('')).toBe(false);
    expect(isValidSupportReference('ACK-20260811-')).toBe(false);
    expect(isValidSupportReference('ACK-20260811-X7K4P9Q')).toBe(false); // 7 chars
    expect(isValidSupportReference('ACK-20260811-X7K4P9QMA')).toBe(false); // 9 chars
    expect(isValidSupportReference('TKT-20260811-X7K4P9QM')).toBe(false); // Wrong prefix
    expect(isValidSupportReference('ACK-2026081-X7K4P9QM')).toBe(false); // 7-digit date
    expect(isValidSupportReference('ACK-20260811-X7K4P90M')).toBe(false); // Contains '0'
    expect(isValidSupportReference('ACK-20260811-X7K4P91M')).toBe(false); // Contains '1'
    expect(isValidSupportReference('ACK-20260811-X7K4P9IM')).toBe(false); // Contains 'I'
    expect(isValidSupportReference('ACK-20260811-X7K4P9OM')).toBe(false); // Contains 'O'
    expect(isValidSupportReference('ack-20260811-x7k4p9qm')).toBe(false); // Lowercase
    expect(isValidSupportReference(null as unknown as string)).toBe(false);
    expect(isValidSupportReference(undefined as unknown as string)).toBe(false);
  });
});
