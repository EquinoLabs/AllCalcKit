export interface CurrencyConfig {
  code: string;
  symbol: string;
  locale: string;
  label: string;
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', locale: 'en-US', label: 'USD ($)' },
  INR: { code: 'INR', symbol: '₹', locale: 'en-IN', label: 'INR (₹)' },
  EUR: { code: 'EUR', symbol: '€', locale: 'en-IE', label: 'EUR (€)' },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', label: 'GBP (£)' }
};

export function formatCurrencyValue(amount: number, currencyCode: string = 'USD'): string {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const isInteger = Number.isInteger(amount);
  
  try {
    const formattedNumber = new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: isInteger ? 0 : 2,
      maximumFractionDigits: 2
    }).format(amount);
    
    return `${config.symbol}${formattedNumber}`;
  } catch (e) {
    return `${config.symbol}${amount.toLocaleString()}`;
  }
}

export function formatRawNumber(amount: number, currencyCode: string = 'USD'): string {
  const config = SUPPORTED_CURRENCIES[currencyCode] || SUPPORTED_CURRENCIES.USD;
  const isInteger = Number.isInteger(amount);

  try {
    return new Intl.NumberFormat(config.locale, {
      minimumFractionDigits: isInteger ? 0 : 2,
      maximumFractionDigits: 2
    }).format(amount);
  } catch (e) {
    return amount.toLocaleString();
  }
}
