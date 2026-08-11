/**
 * Transactional Email Delivery Service for AllCalcKit Contact Us submissions.
 * 
 * Supports production transactional delivery via Resend HTTPS API,
 * with zero-dependency simulated mode for local development and automated testing.
 */

import { escapeHtml } from '../utils/contactValidation';

export interface EmailPayload {
  reference: string;
  name: string;
  email: string;
  subjectKey: string;
  subjectLabel: string;
  message: string;
  submittedAt: string;
  sourceUrl?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  mode: 'live' | 'simulated';
}

/**
 * Builds the plain text email content matching AllCalcKit's support format.
 */
export function buildPlainTextEmail(payload: EmailPayload): string {
  const source = payload.sourceUrl || 'https://allcalckit.com/contact';
  
  return [
    '--------------------------------------------------',
    'AllCalcKit Contact Form',
    '--------------------------------------------------',
    '',
    'Support Reference:',
    payload.reference,
    '',
    'Name:',
    payload.name,
    '',
    'Email:',
    payload.email,
    '',
    'Inquiry Type:',
    payload.subjectLabel,
    '',
    'Message:',
    payload.message,
    '',
    'Submitted:',
    payload.submittedAt,
    '',
    'Source:',
    source,
    '--------------------------------------------------',
  ].join('\n');
}

/**
 * Builds a clean HTML email structure for visual email clients.
 */
export function buildHtmlEmail(payload: EmailPayload): string {
  const source = payload.sourceUrl || 'https://allcalckit.com/contact';
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeSubjectLabel = escapeHtml(payload.subjectLabel);
  const safeMessage = escapeHtml(payload.message).replace(/\n/g, '<br/>');
  const safeRef = escapeHtml(payload.reference);
  const safeSubmittedAt = escapeHtml(payload.submittedAt);
  const safeSource = escapeHtml(source);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Support Request — ${safeRef}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #171717; background-color: #f5f5f5; margin: 0; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; border-radius: 12px; overflow: hidden;">
    <div style="background: #000000; color: #ffffff; padding: 20px 24px;">
      <h1 style="margin: 0; font-size: 18px; font-weight: 700; letter-spacing: -0.02em;">AllCalcKit Support Request</h1>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #a3a3a3; font-family: monospace;">Ref: ${safeRef}</p>
    </div>
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #737373; width: 140px; font-weight: 600;">Support Ref:</td>
          <td style="padding: 8px 0; font-family: monospace; font-weight: bold; color: #000000;">${safeRef}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #737373; font-weight: 600;">Name:</td>
          <td style="padding: 8px 0; color: #171717;">${safeName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #737373; font-weight: 600;">Email:</td>
          <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #737373; font-weight: 600;">Inquiry Type:</td>
          <td style="padding: 8px 0; color: #171717;">${safeSubjectLabel}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #737373; font-weight: 600;">Submitted:</td>
          <td style="padding: 8px 0; color: #525252; font-size: 13px;">${safeSubmittedAt}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #737373; font-weight: 600;">Source:</td>
          <td style="padding: 8px 0;"><a href="${safeSource}" style="color: #2563eb; text-decoration: none; font-size: 13px;">${safeSource}</a></td>
        </tr>
      </table>

      <div style="margin-top: 20px; padding: 16px; background-color: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px;">
        <div style="font-weight: 600; font-size: 13px; color: #525252; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">Message</div>
        <div style="font-size: 14px; color: #171717; white-space: pre-wrap; word-break: break-word;">${safeMessage}</div>
      </div>
    </div>
    <div style="background: #fafafa; border-top: 1px solid #e5e5e5; padding: 12px 24px; font-size: 11px; color: #737373; text-align: center;">
      This email was sent via the AllCalcKit Contact Form. Reply directly to this email to reach the user.
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Resolves environment variables across Astro/Vite (import.meta.env)
 * and Node/process environments (process.env).
 */
function getEnvVar(key: string): string | undefined {
  if (typeof import.meta !== 'undefined' && import.meta.env && typeof import.meta.env[key] === 'string' && import.meta.env[key].length > 0) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && typeof process.env[key] === 'string' && process.env[key].length > 0) {
    return process.env[key];
  }
  return undefined;
}

/**
 * Detects whether the current execution is within an automated test runner.
 */
function isTestEnvironment(): boolean {
  if (typeof process !== 'undefined' && process.env) {
    if (process.env.NODE_ENV === 'test' || process.env.VITEST === 'true') {
      return true;
    }
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.MODE === 'test' || import.meta.env.VITEST === 'true') {
      return true;
    }
  }
  return false;
}

/**
 * Sends a structured support request email.
 * 
 * Target: support@allcalckit.com
 * 
 * Secrets may be supplied via the `env` parameter (Cloudflare Pages Functions
 * expose them this way); falls back to the process/import.meta environments.
 */
export async function sendContactEmail(payload: EmailPayload, env?: Record<string, string | undefined>): Promise<SendEmailResult> {
  const recipient = env?.CONTACT_EMAIL_TO || getEnvVar('CONTACT_EMAIL_TO') || 'support@allcalckit.com';
  const sender = env?.CONTACT_EMAIL_FROM || getEnvVar('CONTACT_EMAIL_FROM') || 'AllCalcKit Support <support@allcalckit.com>';
  const apiKey = env?.RESEND_API_KEY || getEnvVar('RESEND_API_KEY');
  const isTest = isTestEnvironment();

  const subject = `[AllCalcKit] Support Request — ${payload.reference}`;
  const text = buildPlainTextEmail(payload);
  const html = buildHtmlEmail(payload);

  // If running in test mode or no API key is configured, operate in safe simulated mode
  if (isTest || !apiKey) {
    if (!isTest) {
      console.log(`[ContactEmail Simulated] No RESEND_API_KEY found. Simulated email to ${recipient} (Ref: ${payload.reference}):\n${text}`);
    }
    return {
      success: true,
      messageId: `sim_${payload.reference}`,
      mode: 'simulated',
    };
  }

  // Live transactional delivery via Resend HTTP API
  console.log(`[ContactEmail Live] Dispatching to Resend API for ${recipient} (Ref: ${payload.reference})...`);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      reply_to: payload.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown network error');
    console.error(`[ContactEmail Error] Status: ${response.status}, Body: ${errorText}`);
    throw new Error(`Email service error: ${response.status}`);
  }

  const resultData = await response.json().catch(() => ({})) as { id?: string };
  console.log(`[ContactEmail Live] Successfully dispatched to Resend. Message ID: ${resultData.id || `live_${payload.reference}`}`);
  return {
    success: true,
    messageId: resultData.id || `live_${payload.reference}`,
    mode: 'live',
  };
}

