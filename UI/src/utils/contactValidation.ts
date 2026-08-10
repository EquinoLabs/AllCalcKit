/**
 * Validation and sanitization utilities for the Contact Us form.
 */

export const INQUIRY_TYPES = {
  request: 'New Tool / Calculator Request',
  feedback: 'General Feedback & Suggestions',
  bug: 'Report a Bug or Calculation Issue',
  partnership: 'Business / Media Inquiry',
} as const;

export type InquiryTypeKey = keyof typeof INQUIRY_TYPES;

export interface ContactFormInput {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  honeypot?: unknown;
}

export interface SanitizedContactData {
  name: string;
  email: string;
  subject: InquiryTypeKey;
  subjectLabel: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
  sanitizedData?: SanitizedContactData;
}

// Standard RFC 5322 compliant email regex check
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

/**
 * Strips carriage returns and newlines to prevent email header injection.
 */
export function stripNewlines(value: string): string {
  return value.replace(/[\r\n\t]/g, ' ').trim();
}

/**
 * Escapes special HTML characters for safe HTML email rendering.
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates and sanitizes contact form submissions.
 */
export function validateContactForm(input: ContactFormInput | null | undefined): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: { form: 'Invalid submission data.' },
    };
  }

  // Honeypot check - if filled, reject silently or flag as bot
  if (input.honeypot && typeof input.honeypot === 'string' && input.honeypot.trim().length > 0) {
    return {
      valid: false,
      errors: { honeypot: 'Automated submission rejected.' },
    };
  }

  // Name validation
  const rawName = typeof input.name === 'string' ? input.name.trim() : '';
  const sanitizedName = stripNewlines(rawName);
  if (!sanitizedName) {
    errors.name = 'Your name is required.';
  } else if (sanitizedName.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (sanitizedName.length > 100) {
    errors.name = 'Name must not exceed 100 characters.';
  }

  // Email validation
  const rawEmail = typeof input.email === 'string' ? input.email.trim().toLowerCase() : '';
  const sanitizedEmail = stripNewlines(rawEmail);
  if (!sanitizedEmail) {
    errors.email = 'Email address is required.';
  } else if (sanitizedEmail.length > 254) {
    errors.email = 'Email address must not exceed 254 characters.';
  } else if (!EMAIL_REGEX.test(sanitizedEmail)) {
    errors.email = 'Please provide a valid email address.';
  }

  // Subject / Inquiry Type validation
  const rawSubject = typeof input.subject === 'string' ? input.subject.trim() : '';
  if (!rawSubject) {
    errors.subject = 'Inquiry type is required.';
  } else if (!Object.prototype.hasOwnProperty.call(INQUIRY_TYPES, rawSubject)) {
    errors.subject = 'Please select a valid inquiry type.';
  }

  // Message validation
  const rawMessage = typeof input.message === 'string' ? input.message.trim() : '';
  if (!rawMessage) {
    errors.message = 'Message is required.';
  } else if (rawMessage.length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (rawMessage.length > 5000) {
    errors.message = 'Message must not exceed 5,000 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  const subjectKey = rawSubject as InquiryTypeKey;
  return {
    valid: true,
    errors: {},
    sanitizedData: {
      name: sanitizedName,
      email: sanitizedEmail,
      subject: subjectKey,
      subjectLabel: INQUIRY_TYPES[subjectKey],
      message: rawMessage,
    },
  };
}
