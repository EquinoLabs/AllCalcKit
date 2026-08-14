import { describe, it, expect } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';

describe('PWA Manifest & Configuration', () => {
  const manifestPath = path.resolve(__dirname, '../../public/site.webmanifest');

  it('site.webmanifest exists and is valid JSON', () => {
    expect(fs.existsSync(manifestPath)).toBe(true);
    const content = fs.readFileSync(manifestPath, 'utf-8');
    const json = JSON.parse(content);

    expect(json.name).toBe('All Calc Kit');
    expect(json.short_name).toBe('CalcKit');
    expect(json.display).toBe('standalone');
    expect(json.start_url).toBe('/');
    expect(json.theme_color).toBe('#09090b');
    expect(json.background_color).toBe('#09090b');
  });

  it('includes dedicated any and maskable icon entries with existing files', () => {
    const content = fs.readFileSync(manifestPath, 'utf-8');
    const json = JSON.parse(content);
    expect(Array.isArray(json.icons)).toBe(true);

    const anyIcons = json.icons.filter((i: any) => i.purpose === 'any');
    const maskableIcons = json.icons.filter((i: any) => i.purpose === 'maskable');

    expect(anyIcons.length).toBeGreaterThanOrEqual(2);
    expect(maskableIcons.length).toBeGreaterThanOrEqual(2);

    expect(anyIcons.map((i: any) => i.sizes)).toContain('192x192');
    expect(anyIcons.map((i: any) => i.sizes)).toContain('512x512');
    expect(maskableIcons.map((i: any) => i.sizes)).toContain('192x192');
    expect(maskableIcons.map((i: any) => i.sizes)).toContain('512x512');

    // Confirm all 4 physical icon image files exist on disk in public/
    for (const icon of json.icons) {
      const iconFilePath = path.resolve(__dirname, '../../public', icon.src.replace(/^\//, ''));
      expect(fs.existsSync(iconFilePath)).toBe(true);
    }
  });
});
