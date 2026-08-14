import { validateContactForm } from '../../src/utils/contactValidation';
import { generateSupportReference } from '../../src/utils/reference';
import { sendContactEmail } from '../../src/lib/email';

export async function onRequestPost({ request, env }) {
  try {
    const apiKey = env?.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env?.RESEND_API_KEY : undefined);
    if (!apiKey || typeof apiKey !== 'string' || !apiKey.trim()) {
      console.error('[Contact API Error]: RESEND_API_KEY environment variable is not configured.');
      return new Response(
        JSON.stringify({ success: false, error: 'Email service not configured. Please contact support@allcalckit.com directly.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Content-Type must be application/json.' }),
        { status: 415, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rawBody = await request.text();
    if (rawBody.length > 50 * 1024) {
      return new Response(
        JSON.stringify({ success: false, error: 'Request payload exceeds allowable limit.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let parsedBody;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Malformed JSON payload.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Honeypot check — if tripped, fake a success response so bots don't adapt
    if (parsedBody.honeypot) {
      return new Response(
        JSON.stringify({ success: true, reference: generateSupportReference(), message: 'Message sent successfully!' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const validation = validateContactForm(parsedBody);
    if (!validation.valid || !validation.sanitizedData) {
      return new Response(
        JSON.stringify({ success: false, errors: validation.errors, error: 'Validation failed. Please check the form fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { sanitizedData } = validation;
    const reference = generateSupportReference();
    const submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

    await sendContactEmail({
      reference,
      name: sanitizedData.name,
      email: sanitizedData.email,
      subjectKey: sanitizedData.subject,
      subjectLabel: sanitizedData.subjectLabel,
      message: sanitizedData.message,
      submittedAt,
      sourceUrl: 'https://allcalckit.com/contact',
    }, env); // Cloudflare secrets arrive via the env parameter, not process.env

    return new Response(
      JSON.stringify({ success: true, reference, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Something went wrong while sending your message. Please try again or email support@allcalckit.com directly.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function onRequest({ request }) {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed. Use POST to submit the contact form.' }),
      { status: 405, headers: { 'Content-Type': 'application/json', 'Allow': 'POST' } }
    );
  }
}