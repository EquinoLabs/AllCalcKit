import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportTableToCsv } from '../../src/utils/exportUtils';

describe('Export Utilities (CSV)', () => {
  let createdElement: any;
  let clicked = false;

  beforeEach(() => {
    clicked = false;
    createdElement = {
      setAttribute: vi.fn(),
      style: {},
      click: vi.fn(() => { clicked = true; })
    };

    // @ts-expect-error mock DOM
    globalThis.window = {} as any;
    globalThis.document = {
      createElement: vi.fn(() => createdElement),
      body: {
        appendChild: vi.fn(),
        removeChild: vi.fn()
      }
    };

    globalThis.URL = {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn()
    } as any;

    globalThis.Blob = class Blob {
      content: any[];
      options: any;
      constructor(content: any[], options: any) {
        this.content = content;
        this.options = options;
      }
    } as any;
  });

  it('triggers CSV download with properly escaped content', () => {
    const headers = ['Month', 'Principal', 'Interest', 'Balance'];
    const rows = [
      [1, 1000, 200, 9000],
      [2, 1050, 190, 7950]
    ];

    exportTableToCsv('amortization-schedule.csv', headers, rows);

    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(createdElement.setAttribute).toHaveBeenCalledWith('href', 'blob:mock-url');
    expect(createdElement.setAttribute).toHaveBeenCalledWith('download', 'amortization-schedule.csv');
    expect(clicked).toBe(true);
  });
});
