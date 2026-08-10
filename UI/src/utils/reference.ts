/**
 * Support Reference Generator and Validator for AllCalcKit
 * 
 * Format: ACK-YYYYMMDD-RANDOM (e.g. ACK-20260811-X7K4P9QM)
 * - ACK = AllCalcKit
 * - YYYYMMDD = submission date (UTC)
 * - RANDOM = 8-character cryptographically secure identifier
 * 
 * Character set excludes easily confused characters: I, O, 0, 1.
 * 32 characters total (5 bits of entropy per char => 40 bits of entropy).
 */

export const SUPPORT_REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
export const SUPPORT_REF_REGEX = /^ACK-\d{8}-[A-HJ-NP-Z2-9]{8}$/;

/**
 * Generates a human-readable, cryptographically secure support reference.
 * 
 * @param date Optional date for YYYYMMDD portion (defaults to current UTC date)
 * @returns Support reference string formatted as ACK-YYYYMMDD-RANDOM
 */
export function generateSupportReference(date: Date = new Date()): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const yyyymmdd = `${year}${month}${day}`;

  const randomBytes = new Uint8Array(8);
  crypto.getRandomValues(randomBytes);

  let randomPart = '';
  for (let i = 0; i < 8; i++) {
    // Alphabet has length 32 (2^5), so modulo gives uniform distribution
    randomPart += SUPPORT_REF_ALPHABET[randomBytes[i] % SUPPORT_REF_ALPHABET.length];
  }

  return `ACK-${yyyymmdd}-${randomPart}`;
}

/**
 * Validates whether a given string matches the standard support reference format.
 */
export function isValidSupportReference(ref: string): boolean {
  if (typeof ref !== 'string') return false;
  return SUPPORT_REF_REGEX.test(ref);
}
