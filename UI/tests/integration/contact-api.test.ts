import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, ALL } from '../../src/pages/api/contact';
import { sendContactEmail } from '../../src/lib/email';
import { isValidSupportReference } from '../../src/utils/reference';

// Mock context for Astro APIRoute
function createAstroContext(req: Request) {
  return {
    request: req,
    params: {},
    props: {},
    site: new URL('https://allcalckit.com'),
    generator: 'Astro',
    cookies: {} as unknown,
    redirect: vi.fn(),
    locals: {},
    url: new URL(req.url),
    clientAddress: '127.0.0.1',
  } as unknown as Parameters<typeof POST>[0];
}

describe('Contact API Endpoint (POST /api/contact)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('successfully processes valid submissions and returns a 200 with support reference', async () => {
    const validBody = {
      name: 'Sarah Jenkins',
      email: 'sarah@example.com',
      subject: 'bug',
      message: 'Found an issue with decimal precision in the percentage calculator.',
    };

    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validBody),
    });

    const response = await POST(createAstroContext(req));
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.reference).toBeDefined();
    expect(isValidSupportReference(data.reference)).toBe(true);
    expect(data.message).toBe('Message sent successfully!');
  });

  it('rejects submissions with missing or invalid fields with HTTP 400', async () => {
    const invalidBody = {
      name: '',
      email: 'not-an-email',
      subject: 'invalid-subject',
      message: 'short',
    };

    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invalidBody),
    });

    const response = await POST(createAstroContext(req));
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.errors).toBeDefined();
    expect(data.errors.name).toBeDefined();
    expect(data.errors.email).toBeDefined();
    expect(data.errors.subject).toBeDefined();
    expect(data.errors.message).toBeDefined();
  });

  it('rejects requests with non-JSON Content-Type with HTTP 415', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: 'raw body text',
    });

    const response = await POST(createAstroContext(req));
    expect(response.status).toBe(415);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('Content-Type must be application/json');
  });

  it('rejects malformed JSON payloads with HTTP 400', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{"invalid": json',
    });

    const response = await POST(createAstroContext(req));
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe('Malformed JSON payload.');
  });

  it('rejects payloads exceeding allowable size limit with HTTP 413', async () => {
    const largeBody = {
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'feedback',
      message: 'A'.repeat(60 * 1024), // 60 KB
    };

    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(largeBody),
    });

    const response = await POST(createAstroContext(req));
    expect(response.status).toBe(413);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.error).toContain('exceeds allowable limit');
  });

  it('rejects bot submissions triggering honeypot with HTTP 400', async () => {
    const botBody = {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      subject: 'partnership',
      message: 'Visit our link for commercial partnerships!',
      honeypot: 'filled-by-bot',
    };

    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(botBody),
    });

    const response = await POST(createAstroContext(req));
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.success).toBe(false);
    expect(data.errors.honeypot).toBeDefined();
  });

  it('returns HTTP 405 for non-POST HTTP methods via ALL handler', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'GET',
    });

    const response = await ALL(createAstroContext(req));
    expect(response.status).toBe(405);
    expect(response.headers.get('Allow')).toBe('POST');
  });

  it('runs sendContactEmail in simulation mode when no API key is set', async () => {
    const emailResult = await sendContactEmail({
      reference: 'ACK-20260811-TESTTEST',
      name: 'Tester',
      email: 'test@example.com',
      subjectKey: 'request',
      subjectLabel: 'New Tool / Calculator Request',
      message: 'Please add an option price calculator tool.',
      submittedAt: '2026-08-11 12:00:00 UTC',
    });

    expect(emailResult.success).toBe(true);
    expect(emailResult.mode).toBe('simulated');
    expect(emailResult.messageId).toContain('ACK-20260811-TESTTEST');
  });
});
