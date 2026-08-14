/**
 * Shareable Results Utility Module
 * Handles serialization, deserialization, URL generation, clipboard copying,
 * and navigator.share integration for calculator state sharing.
 */

export interface ParamSchemaNumber {
  type: 'number';
  min?: number;
  max?: number;
  default?: number;
  step?: number;
  aliases?: string[];
}

export interface ParamSchemaString {
  type: 'string';
  allowedValues?: string[];
  default?: string;
  aliases?: string[];
}

export interface ParamSchemaBoolean {
  type: 'boolean';
  default?: boolean;
  aliases?: string[];
}

export type ParamSchema = ParamSchemaNumber | ParamSchemaString | ParamSchemaBoolean;

export type CalculatorSchema = Record<string, ParamSchema>;

export interface ShareData {
  title?: string;
  text?: string;
  url: string;
}

export interface ShareResultResponse {
  method: 'native' | 'clipboard' | 'none';
  success: boolean;
  message?: string;
}

export const LOAN_EMI_SCHEMA: CalculatorSchema = {
  currency: {
    type: 'string',
    allowedValues: ['USD', 'INR', 'EUR', 'GBP'],
    default: 'USD',
    aliases: ['unit', 'curr']
  },
  // Single-calculator mode parameters
  amount: {
    type: 'number',
    min: 1000,
    max: 50000000,
    default: 100000,
    aliases: ['loanAmount', 'principal']
  },
  rate: {
    type: 'number',
    min: 0.1,
    max: 30,
    default: 8.5,
    aliases: ['interestRate', 'interest']
  },
  years: {
    type: 'number',
    min: 1,
    max: 30,
    default: 5,
    aliases: ['tenure', 'term', 'loanTenure']
  },
  // Comparison mode parameters
  compare: {
    type: 'boolean',
    default: false,
    aliases: ['comparison', 'comp']
  },
  amountA: {
    type: 'number',
    min: 1000,
    max: 50000000,
    default: 100000,
    aliases: ['principalA', 'loanAmountA']
  },
  rateA: {
    type: 'number',
    min: 0.1,
    max: 30,
    default: 8.5,
    aliases: ['interestRateA', 'interestA']
  },
  yearsA: {
    type: 'number',
    min: 1,
    max: 30,
    default: 5,
    aliases: ['tenureA', 'termA', 'loanTenureA']
  },
  amountB: {
    type: 'number',
    min: 1000,
    max: 50000000,
    default: 100000,
    aliases: ['principalB', 'loanAmountB']
  },
  rateB: {
    type: 'number',
    min: 0.1,
    max: 30,
    default: 8.0,
    aliases: ['interestRateB', 'interestB']
  },
  yearsB: {
    type: 'number',
    min: 1,
    max: 30,
    default: 5,
    aliases: ['tenureB', 'termB', 'loanTenureB']
  }
};

/**
 * Predefined schema for Rent vs. Buy Calculator (/finance/rent-vs-buy)
 */
export const RENT_VS_BUY_SCHEMA: CalculatorSchema = {
  unit: {
    type: 'string',
    allowedValues: ['USD', 'INR', 'EUR', 'GBP'],
    default: 'INR',
    aliases: ['currency', 'curr']
  },
  years: {
    type: 'number',
    min: 1,
    max: 30,
    default: 15,
    aliases: ['horizon', 'timeHorizon']
  },
  rent: {
    type: 'number',
    min: 100,
    max: 1000000,
    default: 25000,
    aliases: ['monthlyRent']
  },
  rentGrowth: {
    type: 'number',
    min: 0,
    max: 25,
    default: 5.0,
    aliases: ['rentIncrease', 'growth']
  },
  miscCosts: {
    type: 'number',
    min: 0,
    max: 500000,
    default: 5000,
    aliases: ['misc', 'rentersInsurance', 'insurance']
  },
  investmentReturn: {
    type: 'number',
    min: 0,
    max: 50,
    default: 11.0,
    aliases: ['investment', 'invReturn', 'invRate']
  },
  homePrice: {
    type: 'number',
    min: 10000,
    max: 100000000,
    default: 7500000,
    aliases: ['price', 'purchasePrice']
  },
  downPayment: {
    type: 'number',
    min: 0,
    max: 100,
    default: 20,
    aliases: ['down', 'downPct', 'downPaymentPercent']
  },
  mortgageRate: {
    type: 'number',
    min: 0,
    max: 25,
    default: 8.5,
    aliases: ['mortgage', 'rate', 'loanRate']
  },
  propertyTax: {
    type: 'number',
    min: 0,
    max: 10,
    default: 0.4,
    aliases: ['tax', 'propTax', 'propertyTaxRate']
  },
  maintenance: {
    type: 'number',
    min: 0,
    max: 10,
    default: 1.0,
    aliases: ['maint', 'maintenanceRate']
  },
  appreciation: {
    type: 'number',
    min: -10,
    max: 30,
    default: 4.0,
    aliases: ['apprec', 'homeAppreciationRate', 'growthRate']
  }
};

/**
 * Extracts and parses query parameters from a URL string, URLSearchParams, or location.
 * Validates against the provided schema, dropping invalid, NaN, or out-of-range values.
 * NEVER throws an exception on malformed inputs.
 */
export function parseQueryParams<T = Record<string, any>>(
  search: string | URLSearchParams | Location | undefined | null,
  schema: CalculatorSchema
): { values: Partial<T>; hasParams: boolean } {
  const result: Record<string, any> = {};
  let hasParams = false;

  if (!search) {
    return { values: result as Partial<T>, hasParams: false };
  }

  let params: URLSearchParams;
  try {
    if (typeof search === 'string') {
      let query = search.trim();
      if (query.includes('?')) {
        query = query.split('?')[1];
      }
      params = new URLSearchParams(query);
    } else if (search instanceof URLSearchParams) {
      params = search;
    } else if (typeof search === 'object' && 'search' in search) {
      params = new URLSearchParams(search.search);
    } else {
      return { values: result as Partial<T>, hasParams: false };
    }
  } catch (e) {
    return { values: result as Partial<T>, hasParams: false };
  }

  for (const [key, def] of Object.entries(schema)) {
    // Check primary key first, then aliases in order
    let rawVal = params.get(key);
    if (rawVal === null && def.aliases && def.aliases.length > 0) {
      for (const alias of def.aliases) {
        const aliasVal = params.get(alias);
        if (aliasVal !== null) {
          rawVal = aliasVal;
          break;
        }
      }
    }

    if (rawVal === null || rawVal === '') {
      continue;
    }

    if (def.type === 'number') {
      const num = parseFloat(rawVal);
      if (!isNaN(num) && isFinite(num)) {
        const minOk = def.min === undefined || num >= def.min;
        const maxOk = def.max === undefined || num <= def.max;
        if (minOk && maxOk) {
          result[key] = num;
          hasParams = true;
        }
      }
    } else if (def.type === 'string') {
      const strVal = rawVal.trim();
      if (def.allowedValues && def.allowedValues.length > 0) {
        if (def.allowedValues.includes(strVal)) {
          result[key] = strVal;
          hasParams = true;
        }
      } else if (strVal.length > 0) {
        result[key] = strVal;
        hasParams = true;
      }
    } else if (def.type === 'boolean') {
      const lower = rawVal.trim().toLowerCase();
      if (lower === 'true' || lower === '1' || lower === 'yes') {
        result[key] = true;
        hasParams = true;
      } else if (lower === 'false' || lower === '0' || lower === 'no') {
        result[key] = false;
        hasParams = true;
      }
    }
  }

  return { values: result as Partial<T>, hasParams };
}

/**
 * Serializes calculator values into a clean URL query parameter string.
 * Omits undefined, null, or empty values. Formats numbers concisely.
 */
export function serializeQueryParams(
  values: Record<string, any>,
  schema?: CalculatorSchema
): string {
  if (!values || typeof values !== 'object') {
    return '';
  }

  const params = new URLSearchParams();

  for (const [key, val] of Object.entries(values)) {
    if (val === undefined || val === null || val === '') {
      continue;
    }

    if (typeof val === 'number') {
      if (isNaN(val) || !isFinite(val)) continue;
      // If decimal, round to max 4 fractional digits to keep URL clean
      const formattedNum = Number(val.toFixed(4)).toString();
      params.set(key, formattedNum);
    } else if (typeof val === 'boolean') {
      params.set(key, val ? 'true' : 'false');
    } else {
      params.set(key, String(val).trim());
    }
  }

  return params.toString();
}

/**
 * Generates an absolute or relative shareable URL from a base path and values.
 */
export function generateShareUrl(
  baseOrPath: string,
  values: Record<string, any>,
  schema?: CalculatorSchema
): string {
  const query = serializeQueryParams(values, schema);
  let base = baseOrPath || '/';

  // Strip existing query string or hash from base
  if (base.includes('?')) {
    base = base.split('?')[0];
  }
  if (base.includes('#')) {
    base = base.split('#')[0];
  }

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    if (base.startsWith('/')) {
      base = `${window.location.origin}${base}`;
    }
  }

  return query ? `${base}?${query}` : base;
}

/**
 * Copies text to the clipboard with modern navigator.clipboard and fallback.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Primary: Navigator Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Permission denied or context not focused; fallback below
    }
  }

  // Fallback: Temporary DOM textarea with document.execCommand('copy')
  if (typeof document !== 'undefined') {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.setAttribute('readonly', '');
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);

      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Boolean(successful);
    } catch (err) {
      return false;
    }
  }

  return false;
}

/**
 * Shares calculation result using Web Share API (navigator.share) when available,
 * falling back to clipboard copy.
 */
export async function shareResult(shareData: ShareData): Promise<ShareResultResponse> {
  if (!shareData || !shareData.url) {
    return { method: 'none', success: false, message: 'Invalid share data' };
  }

  // 1. Try native Web Share API (mobile/supporting browsers)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      // Check canShare if available
      const canShare = typeof navigator.canShare === 'function' ? navigator.canShare(shareData) : true;
      if (canShare) {
        await navigator.share(shareData);
        return {
          method: 'native',
          success: true,
          message: 'Shared successfully!'
        };
      }
    } catch (err: any) {
      // If user aborted / dismissed the share sheet, handle gracefully without copying or throwing
      if (err && (err.name === 'AbortError' || err.message?.includes('abort') || err.message?.includes('cancel'))) {
        return {
          method: 'native',
          success: false,
          message: 'Share cancelled'
        };
      }
      // On other share errors, fall through to clipboard copy fallback
    }
  }

  // 2. Fallback: Copy link to clipboard
  const copied = await copyToClipboard(shareData.url);
  if (copied) {
    return {
      method: 'clipboard',
      success: true,
      message: 'Link copied!'
    };
  }

  return {
    method: 'none',
    success: false,
    message: 'Could not share or copy link'
  };
}

/**
 * Helper to initialize and bind a share button element to calculator state.
 */
export function initShareButton(options: {
  buttonId: string;
  getParams: () => Record<string, any>;
  schema?: CalculatorSchema;
  title?: string;
  text?: string;
  onShareComplete?: (response: ShareResultResponse) => void;
}): void {
  if (typeof document === 'undefined') return;

  const btn = document.getElementById(options.buttonId);
  if (!btn) return;

  const container = btn.closest('[data-share-container]') || btn.parentElement;
  const labelEl = container?.querySelector('[data-share-label]') || btn.querySelector('[data-share-label]');
  const defaultIcon = container?.querySelector('[data-share-icon="default"]') || btn.querySelector('[data-share-icon="default"]');
  const successIcon = container?.querySelector('[data-share-icon="success"]') || btn.querySelector('[data-share-icon="success"]');
  const statusEl = container?.querySelector('[data-share-status]');

  const defaultText = btn.getAttribute('data-default-text') || labelEl?.textContent || 'Share Result';
  const copiedText = btn.getAttribute('data-copied-text') || 'Link copied!';
  const sharedText = btn.getAttribute('data-shared-text') || 'Shared successfully!';
  const calcTitle = options.title || btn.getAttribute('data-calc-title') || document.title || 'Calculation Result';

  let resetTimer: any = null;

  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (resetTimer) {
      clearTimeout(resetTimer);
      resetTimer = null;
    }

    const params = options.getParams();
    const shareUrl = generateShareUrl(window.location.pathname, params, options.schema);

    const shareData: ShareData = {
      title: calcTitle,
      text: options.text || `Check out this ${calcTitle} on All Calc Kit:`,
      url: shareUrl
    };

    const res = await shareResult(shareData);

    if (res.success) {
      // Switch UI to success feedback
      const feedbackMessage = res.method === 'native' ? sharedText : copiedText;

      if (labelEl) labelEl.textContent = feedbackMessage;
      if (defaultIcon) defaultIcon.classList.add('hidden');
      if (successIcon) successIcon.classList.remove('hidden');

      btn.classList.add(
        'bg-emerald-50',
        'dark:bg-emerald-950/70',
        'text-emerald-700',
        'dark:text-emerald-300',
        'border-emerald-400',
        'dark:border-emerald-600'
      );

      if (statusEl) {
        statusEl.textContent = `${feedbackMessage} - URL: ${shareUrl}`;
      }

      // Smooth reset after 2.5 seconds
      resetTimer = setTimeout(() => {
        if (labelEl) labelEl.textContent = defaultText;
        if (defaultIcon) defaultIcon.classList.remove('hidden');
        if (successIcon) successIcon.classList.add('hidden');

        btn.classList.remove(
          'bg-emerald-50',
          'dark:bg-emerald-950/70',
          'text-emerald-700',
          'dark:text-emerald-300',
          'border-emerald-400',
          'dark:border-emerald-600'
        );

        if (statusEl) statusEl.textContent = '';
      }, 2500);
    }

    if (options.onShareComplete) {
      options.onShareComplete(res);
    }
  });
}
