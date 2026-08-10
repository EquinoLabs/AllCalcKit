import { describe, it, expect } from 'vitest';
import {
  countTextMetrics,
  convertCase,
  hexToRgb,
  rgbToHex,
  rgbToHsl
} from '../../src/lib/calculators/text';

describe('Text & Encoding Tools Engine', () => {
  describe('Word & Character Counter', () => {
    it('counts words, characters, sentences, and reading time', () => {
      const text = 'The quick brown fox jumps over the lazy dog. It was a sunny day!';
      const res = countTextMetrics(text);
      expect(res.wordCount).toBe(14);
      expect(res.sentenceCount).toBe(2);
      expect(res.charCountWithSpaces).toBe(text.length);
      expect(res.charCountNoSpaces).toBe(text.replace(/\s/g, '').length);
      expect(res.readingTimeMinutes).toBe(0.1);
    });

    it('handles empty input gracefully', () => {
      const res = countTextMetrics('');
      expect(res.wordCount).toBe(0);
      expect(res.sentenceCount).toBe(0);
    });
  });

  describe('Text Case Converter', () => {
    const sample = 'all calc kit precision';

    it('converts to UPPERCASE and lowercase', () => {
      expect(convertCase(sample, 'upper')).toBe('ALL CALC KIT PRECISION');
      expect(convertCase('HELLO WORLD', 'lower')).toBe('hello world');
    });

    it('converts to Title Case', () => {
      expect(convertCase(sample, 'title')).toBe('All Calc Kit Precision');
    });

    it('converts to camelCase and PascalCase', () => {
      expect(convertCase(sample, 'camel')).toBe('allCalcKitPrecision');
      expect(convertCase(sample, 'pascal')).toBe('AllCalcKitPrecision');
    });

    it('converts to snake_case and kebab-case', () => {
      expect(convertCase(sample, 'snake')).toBe('all_calc_kit_precision');
      expect(convertCase(sample, 'kebab')).toBe('all-calc-kit-precision');
    });
  });

  describe('Color Code Converter', () => {
    it('converts HEX to RGB and back', () => {
      const rgb = hexToRgb('#0070F3')!;
      expect(rgb).toEqual({ r: 0, g: 112, b: 243 });
      expect(rgbToHex(rgb.r, rgb.g, rgb.b)).toBe('#0070F3');
    });

    it('converts 3-digit shorthand HEX #FFF', () => {
      expect(hexToRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('converts RGB to HSL', () => {
      const hsl = rgbToHsl(0, 112, 243);
      expect(hsl.h).toBe(212);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(48);
    });
  });
});
