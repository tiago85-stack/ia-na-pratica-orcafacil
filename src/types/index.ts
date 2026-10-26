export type QuoteStatus = "draft" | "sent" | "accepted" | "declined";
export interface QuoteSummary { id: string; number: string; clientName: string; totalCents: number; status: QuoteStatus; createdAt: string; }
