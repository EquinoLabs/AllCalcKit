/**
 * Client-Side Export Utilities
 * Zero-dependency, lightweight utilities for exporting data tables to CSV.
 */

/**
 * Escapes a cell value for standard CSV format (RFC 4180)
 */
function escapeCsvCell(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return '""';
  const str = String(val);
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return `"${str}"`;
}

/**
 * Export table headers and rows as a downloadable CSV file
 */
export function exportTableToCsv(
  filename: string,
  headers: string[],
  rows: (string | number)[][]
): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const headerLine = headers.map(escapeCsvCell).join(',');
  const rowLines = rows.map(row => row.map(escapeCsvCell).join(','));
  const csvContent = [headerLine, ...rowLines].join('\r\n');

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename.endsWith('.csv') ? filename : `${filename}.csv`);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}
