import { describe, it, expect } from 'vitest';
import {
  validateContactForm,
  stripNewlines,
  escapeHtml,
  INQUIRY_TYPES,
} from '../../src/utils/contactValidation';
import { buildPlainTextEmail, buildHtmlEmail } from '../../src/lib/email';

describe('Contact Form Validation & Sanitization', () => {
  it('passes validation with clean, valid data', () => {
    const input = {
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      subject: 'bug',
      message: 'The currency converter is returning incorrect rates for JPY.',
    };

    const result = validateContactForm(input);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.sanitizedData).toEqual({
      name: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      subject: 'bug',
      subjectLabel: 'Report a Bug or Calculation Issue',
      message: 'The currency converter is returning incorrect rates for JPY.',
    });
  });

  it('rejects null or non-object payloads', () => {
    expect(validateContactForm(null).valid).toBe(false);
    expect(validateContactForm(undefined).valid).toBe(false);
    expect(validateContactForm('string' as unknown as Record<string, unknown>).valid).toBe(false);
  });

  it('detects honeypot bot submissions', () => {
    const input = {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      subject: 'request',
      message: 'Buy our SEO services today at low prices!',
      honeypot: 'http://spam-link.com',
    };

    const result = validateContactForm(input);
    expect(result.valid).toBe(false);
    expect(result.errors.honeypot).toBeDefined();
  });

  describe('Name Validation', () => {
    it('requires a name', () => {
      const result = validateContactForm({
        name: '',
        email: 'test@example.com',
        subject: 'feedback',
        message: 'This is a valid message length.',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.name).toBe('Your name is required.');
    });

    it('enforces minimum name length of 2 characters', () => {
      const result = validateContactForm({
        name: 'A',
        email: 'test@example.com',
        subject: 'feedback',
        message: 'This is a valid message length.',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.name).toBe('Name must be at least 2 characters.');
    });

    it('enforces maximum name length of 100 characters', () => {
      const result = validateContactForm({
        name: 'A'.repeat(101),
        email: 'test@example.com',
        subject: 'feedback',
        message: 'This is a valid message length.',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.name).toBe('Name must not exceed 100 characters.');
    });

    it('strips newlines from name to prevent email header injection', () => {
      expect(stripNewlines('John\r\nDoe\tSmith')).toBe('John  Doe Smith');
    });
  });

  describe('Email Validation', () => {
    it('requires an email address', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: '',
        subject: 'feedback',
        message: 'This is a valid message length.',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe('Email address is required.');
    });

    it('rejects invalid email formats', () => {
      const invalidEmails = [
        'plainaddress',
        '@missingusername.com',
        'username@.com',
        'username@domain..com',
        'username space@domain.com',
      ];

      for (const email of invalidEmails) {
        const result = validateContactForm({
          name: 'John Doe',
          email,
          subject: 'feedback',
          message: 'This is a valid message length.',
        });
        expect(result.valid).toBe(false);
        expect(result.errors.email).toBe('Please provide a valid email address.');
      }
    });

    it('enforces email maximum length of 254 characters', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'a'.repeat(250) + '@test.com',
        subject: 'feedback',
        message: 'This is a valid message length.',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe('Email address must not exceed 254 characters.');
    });
  });

  describe('Inquiry Type Validation', () => {
    it('validates all recognized inquiry types', () => {
      const validTypes = Object.keys(INQUIRY_TYPES) as (keyof typeof INQUIRY_TYPES)[];
      for (const type of validTypes) {
        const result = validateContactForm({
          name: 'John Doe',
          email: 'john@example.com',
          subject: type,
          message: 'This is a valid test message with sufficient length.',
        });
        expect(result.valid).toBe(true);
        expect(result.sanitizedData?.subjectLabel).toBe(INQUIRY_TYPES[type]);
      }
    });

    it('rejects unrecognized inquiry types', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'unknown_category',
        message: 'This is a valid test message with sufficient length.',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.subject).toBe('Please select a valid inquiry type.');
    });
  });

  describe('Message Validation', () => {
    it('requires a message', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'feedback',
        message: '',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.message).toBe('Message is required.');
    });

    it('enforces minimum message length of 10 characters', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'feedback',
        message: 'Short',
      });
      expect(result.valid).toBe(false);
      expect(result.errors.message).toBe('Message must be at least 10 characters.');
    });

    it('enforces maximum message length of 5000 characters', () => {
      const result = validateContactForm({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'feedback',
        message: 'M'.repeat(5001),
      });
      expect(result.valid).toBe(false);
      expect(result.errors.message).toBe('Message must not exceed 5,000 characters.');
    });
  });

  describe('Email Content Builders', () => {
    const payload = {
      reference: 'ACK-20260811-X7K4P9QM',
      name: 'John Doe',
      email: 'john@example.com',
      subjectKey: 'bug',
      subjectLabel: 'Report a Bug or Calculation Issue',
      message: 'The currency converter is showing an incorrect rate for EUR/USD.',
      submittedAt: '2026-08-11 12:00:00 UTC',
      sourceUrl: 'https://allcalckit.com/contact',
    };

    it('constructs structured plain text email with all required fields', () => {
      const text = buildPlainTextEmail(payload);
      expect(text).toContain('AllCalcKit Contact Form');
      expect(text).toContain('Support Reference:\nACK-20260811-X7K4P9QM');
      expect(text).toContain('Name:\nJohn Doe');
      expect(text).toContain('Email:\njohn@example.com');
      expect(text).toContain('Inquiry Type:\nReport a Bug or Calculation Issue');
      expect(text).toContain('Message:\nThe currency converter is showing an incorrect rate for EUR/USD.');
      expect(text).toContain('Submitted:\n2026-08-11 12:00:00 UTC');
      expect(text).toContain('Source:\nhttps://allcalckit.com/contact');
    });

    it('constructs safe HTML email and escapes special characters', () => {
      const maliciousPayload = {
        ...payload,
        name: 'John <script>alert(1)</script>',
        message: 'Hello & welcome <img src=x onerror=alert(1)>',
      };

      const html = buildHtmlEmail(maliciousPayload);
      expect(html).toContain('Support Request — ACK-20260811-X7K4P9QM');
      expect(html).toContain('John &lt;script&gt;alert(1)&lt;/script&gt;');
      expect(html).toContain('Hello &amp; welcome &lt;img src=x onerror=alert(1)&gt;');
      expect(html).not.toContain('<script>');
    });

    it('escapes all HTML special characters in escapeHtml helper', () => {
      expect(escapeHtml('&<>"\'')).toBe('&amp;&lt;&gt;&quot;&#039;');
    });
  });
});
