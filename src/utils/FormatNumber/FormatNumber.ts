export type FormatNumberFormat = "number" | "compact" | "currency";
export type FormatNumberFormatOptionsMap = {
  [format in FormatNumberFormat]: Partial<Intl.NumberFormatOptions>;
};
export const FormatNumber = (
  val: number,
  format: FormatNumberFormat = "number",
  local = "en-us",
  optionMap: FormatNumberFormatOptionsMap = {
    number: {},
    compact: { notation: "compact" },
    currency: { currency: "USD", style: "currency" },
  }
): string => {
  const options = optionMap[format] ?? optionMap.number;
  return new Intl.NumberFormat(local, {
    ...options,
  }).format(val);
};
