export const prerender = false;

import type { APIRoute } from 'astro';
import { generateSupportReference } from '../../utils/reference';
import { validateContactForm } from '../../utils/contactValidation';
import { sendContactEmail } from '../../lib/email';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Content-Type must be application/json.',
        }),
        {
          status: 415,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Limit body size (e.g. 50 KB max)
    const rawBody = await request.text();
    if (rawBody.length > 50 * 1024) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Request payload exceeds allowable limit.',
        }),
        {
          status: 413,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Malformed JSON payload.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate inputs
    const validation = validateContactForm(parsedBody as Record<string, unknown>);
    if (!validation.valid || !validation.sanitizedData) {
      return new Response(
        JSON.stringify({
          success: false,
          errors: validation.errors,
          error: 'Validation failed. Please check the form fields.',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { sanitizedData } = validation;

    // Generate unique, cryptographically secure human-readable support reference on the server
    const reference = generateSupportReference();
    const submittedAt = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

    // Send email to support@allcalckit.com
    await sendContactEmail({
      reference,
      name: sanitizedData.name,
      email: sanitizedData.email,
      subjectKey: sanitizedData.subject,
      subjectLabel: sanitizedData.subjectLabel,
      message: sanitizedData.message,
      submittedAt,
      sourceUrl: 'https://allcalckit.com/contact',
    });

    return new Response(
      JSON.stringify({
        success: true,
        reference,
        message: 'Message sent successfully!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // Log internal error safely on the server
    console.error('[Contact API Error]:', error);

    // Return friendly, non-leaking error message to client
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Something went wrong while sending your message. Please try again or email support@allcalckit.com directly.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const ALL: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Method not allowed. Use POST to submit the contact form.',
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST',
      },
    }
  );
};
