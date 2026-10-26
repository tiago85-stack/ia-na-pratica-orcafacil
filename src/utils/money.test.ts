import { describe, expect, it } from "vitest";
import { formatMoney } from "./money";
describe("formatMoney", () => { it("formats cents in BRL", () => { expect(formatMoney(12345)).toContain("123,45"); }); it("formats USD", () => { expect(formatMoney(12345, "USD", "en-US")).toBe("$123.45"); }); });
