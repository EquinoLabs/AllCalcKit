import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { onRequestPost, onRequest } from '../../functions/api/contact';
import { isValidSupportReference } from '../../src/utils/reference';
import { sendContactEmail, buildPlainTextEmail } from '../../src/lib/email';

vi.mock('../../src/lib/email', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../src/lib/email')>();
  return {
    ...actual,
    sendContactEmail: vi.fn(async () => ({
      success: true,
      mode: 'simulated' as const,
      messageId: 'sim_test',
    })),
  };
});

function handler(req: Request, env: Record<string, string | undefined> = {}) {
  return onRequestPost({ request: req, env } as never);
}

describe('Contact API (Cloudflare Pages Function POST /api/contact)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.mocked(sendContactEmail).mockClear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('processes a valid submission: returns 200 + reference, passes reference into the email payload, and forwards env', async () => {
    const payload = {
      name: 'Sarah Jenkins',
      email: 'sarah@example.com',
      subject: 'bug',
      message: 'Found an issue with decimal precision in the percentage calculator.',
    };

    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const response = await handler(req, { RESEND_API_KEY: 'test-key' });
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(isValidSupportReference(data.reference)).toBe(true);
    expect(data.message).toBe('Message sent successfully!');

    expect(sendContactEmail).toHaveBeenCalledTimes(1);
    const [emailPayload, envArg] = vi.mocked(sendContactEmail).mock.calls[0];
    expect(emailPayload.reference).toBe(data.reference);
    expect(emailPayload.name).toBe('Sarah Jenkins');
    expect(emailPayload.subjectLabel).toBe('Report a Bug or Calculation Issue');
    expect(envArg).toMatchObject({ RESEND_API_KEY: 'test-key' });

    // Bug #1 regression: the reference must appear inside the email body itself.
    expect(buildPlainTextEmail(emailPayload)).toContain(`Support Reference:\n${data.reference}`);
    expect(buildPlainTextEmail(emailPayload)).toContain('Sarah Jenkins');
  });

  it('returns field-level errors (same shape as the frontend expects) for invalid submissions', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        email: 'not-an-email',
        subject: 'invalid-subject',
        message: 'short',
      }),
    });

    const response = await handler(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe('Validation failed. Please check the form fields.');
    expect(data.errors.name).toBeDefined();
    expect(data.errors.email).toBeDefined();
    expect(data.errors.subject).toBeDefined();
    expect(data.errors.message).toBeDefined();

    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it('returns a fake success (no email sent) when the honeypot is filled', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Spam Bot',
        email: 'bot@spam.com',
        subject: 'partnership',
        message: 'Visit our link for commercial partnerships!',
        honeypot: 'filled-by-bot',
      }),
    });

    const response = await handler(req, { RESEND_API_KEY: 'test-key' });
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(isValidSupportReference(data.reference)).toBe(true);

    expect(sendContactEmail).not.toHaveBeenCalled();
  });

  it('rejects non-JSON Content-Type with HTTP 415', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'raw body text',
    });

    const response = await handler(req);
    expect(response.status).toBe(415);
    expect((await response.json()).error).toContain('Content-Type must be application/json');
  });

  it('rejects malformed JSON payloads with HTTP 400', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"invalid": json',
    });

    const response = await handler(req);
    expect(response.status).toBe(400);
    expect((await response.json()).error).toBe('Malformed JSON payload.');
  });

  it('rejects payloads exceeding the size limit with HTTP 413', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'John', email: 'john@example.com', subject: 'feedback', message: 'A'.repeat(60 * 1024) }),
    });

    const response = await handler(req);
    expect(response.status).toBe(413);
    expect((await response.json()).error).toContain('exceeds allowable limit');
  });

  it('returns HTTP 405 for non-POST methods', async () => {
    const req = new Request('https://allcalckit.com/api/contact', { method: 'GET' });

    const response = await onRequest({ request: req, env: {} } as never);
    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('POST');
  });

  it('returns a generic 500 when the email service throws', async () => {
    vi.mocked(sendContactEmail).mockRejectedValueOnce(new Error('Resend outage'));

    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sarah Jenkins',
        email: 'sarah@example.com',
        subject: 'feedback',
        message: 'A thorough, valid test message of sufficient length.',
      }),
    });

    const response = await handler(req, { RESEND_API_KEY: 'test-key' });
    expect(response.status).toBe(500);
    expect((await response.json()).error).toContain('Something went wrong while sending your message');
  });
});