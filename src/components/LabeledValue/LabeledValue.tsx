import React from "react";
import classnames from "classnames";
import { FormatNumber } from "utils";

export type LabeledValueType = "number" | "string" | "currency";
export type LabeledValueProps = {
  label: string;
  value: string | number | undefined;
  type?: LabeledValueType;
  formatters?: {
    [key in LabeledValueType]: (v: string | number | undefined) => string;
  };
};

export const LabeledValue: React.FC<LabeledValueProps> = ({
  label,
  value = "-",
  type = "string",
  formatters = {
    string: (v) => v ?? "-",
    currency: (v) =>
      v === undefined
        ? "-"
        : typeof v === "string"
        ? v
        : FormatNumber(v, "currency"),
    number: (v) =>
      v === undefined ? "-" : typeof v === "string" ? v : FormatNumber(v),
  },
}) => {
  const formatter = formatters[type] ?? formatters.string;
  return (
    <div
      className={classnames(
        "flex",
        "min-w-0",
        "space-x-2",
        "whitespace-nowrap",
        "items-center"
      )}
    >
      <div className={classnames("flex", "truncate", "text-sm")}>{label}</div>
      <div className={classnames("flex", "min-w-fit", "font-semibold")}>
        {formatter(value)}
      </div>
    </div>
  );
};
