import { describe, it, expect, vi, beforeEach } from 'vitest';
import { onRequestPost } from '../../functions/api/contact';
import { isValidSupportReference } from '../../src/utils/reference';

function handler(req: Request, env: Record<string, string | undefined> = {}) {
  return onRequestPost({ request: req, env } as never);
}

describe('Contact API (Cloudflare Pages Function POST /api/contact)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('successfully processes valid submissions and returns 200 with a support reference', async () => {
    const fetchMock = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ id: 'msg_123' }), { status: 200 })
      )
    );
    vi.stubGlobal('fetch', fetchMock);

    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sarah Jenkins',
        email: 'sarah@example.com',
        subject: 'bug',
        message: 'Found an issue with decimal precision in the percentage calculator.',
      }),
    });

    const response = await handler(req, { RESEND_API_KEY: 'test-key' });
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(data.success).toBe(true);
    expect(isValidSupportReference(data.reference)).toBe(true);
    expect(data.message).toBe('Message sent successfully!');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.resend.com/emails');
    expect(init.headers['Authorization']).toBe('Bearer test-key');
  });

  it('rejects submissions with missing required fields with HTTP 400', async () => {
    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '', email: 'sarah@example.com', subject: 'bug', message: '' }),
    });

    const response = await handler(req);
    expect(response.status).toBe(400);

    const data = await response.json();
    expect(data.error).toBe('Missing required fields');
    expect(data.errors.name).toBeDefined();
    expect(data.errors.message).toBeDefined();
  });

  it('rejects bot submissions that fill the honeypot field with HTTP 400', async () => {
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

    const response = await handler(req);
    expect(response.status).toBe(400);
    expect((await response.json()).error).toBe('Submission rejected.');
  });

  it('returns HTTP 502 when the Resend API rejects the message', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve(new Response('unauthorized', { status: 401 }))
    ));

    const req = new Request('https://allcalckit.com/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Sarah Jenkins',
        email: 'sarah@example.com',
        subject: 'feedback',
        message: 'A thoroughly complete test message.',
      }),
    });

    const response = await handler(req, { RESEND_API_KEY: 'bad-key' });
    expect(response.status).toBe(502);
    expect((await response.json()).error).toBe('Failed to send email');
  });
});