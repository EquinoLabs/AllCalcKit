const SUPPORT_REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateSupportReference() {
  const now = new Date();
  const yyyymmdd =
    now.getUTCFullYear() +
    String(now.getUTCMonth() + 1).padStart(2, '0') +
    String(now.getUTCDate()).padStart(2, '0');
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let randomPart = '';
  for (let i = 0; i < 8; i++) {
    randomPart += SUPPORT_REF_ALPHABET[bytes[i] % SUPPORT_REF_ALPHABET.length];
  }
  return `ACK-${yyyymmdd}-${randomPart}`;
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();

    // Field names sent by UI/src/pages/contact.astro
    const { name, email, subject, message, honeypot } = body;

    // Anti-spam: honeypot must be empty
    if (honeypot) {
      return new Response(
        JSON.stringify({ error: 'Submission rejected.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!name || !email || !message) {
      const errors = {};
      if (!name) errors.name = 'Please enter your name.';
      if (!email) errors.email = 'Please enter your email address.';
      if (!message) errors.message = 'Please enter a message.';
      return new Response(
        JSON.stringify({ error: 'Missing required fields', errors }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Honeypot cleared; send via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AllCalcKit Contact <support@allcalckit.com>',
        to: ['support@allcalckit.com'],
        reply_to: email,
        subject: `[AllCalcKit] Contact form submission from ${name}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Inquiry Type: ${subject || 'n/a'}`,
          '',
          message,
        ].join('\n'),
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: errText }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        reference: generateSupportReference(),
        message: 'Message sent successfully!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Unexpected error', details: String(err) }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}