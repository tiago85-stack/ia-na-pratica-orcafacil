export function formatMoney(cents: number, currency: "BRL" | "USD" = "BRL", locale = "pt-BR"): string { return new Intl.NumberFormat(locale, { style: "currency", currency }).format(cents / 100); }
