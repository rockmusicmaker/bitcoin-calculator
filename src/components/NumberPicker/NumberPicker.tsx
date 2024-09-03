import React from "react";
import classnames from "classnames";
import { FormatNumber } from "../../utils";

export type NumberPickerType = "number" | "currency";

export type NumberPickerProps = {
  label: string;
  value: number | undefined;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  errorMessage: string | undefined;
  type?: "number" | "currency";
  formatters?: { [key in NumberPickerType]: (v: number) => string };
};

export const NumberPicker: React.FC<NumberPickerProps> = ({
  label,
  onChange,
  value,
  max,
  min,
  step,
  errorMessage,
  type = "number",
  formatters = {
    number: FormatNumber,
    currency: (v) => FormatNumber(v, "currency"),
  },
}) => {
  const formatter = formatters[type] ?? formatters.number;
  return (
    <div
      className={classnames(
        "flex",
        "flex-col",
        "min-w-0",
        "space-y-1",
        "w-full",
        "min-w-0"
      )}
    >
      <div
        className={classnames(
          "flex",
          "flex-col",
          "min-w-0",
          "space-y-2",
          "w-full",
          "min-w-0"
        )}
      >
        <div
          className={classnames(
            "flex",
            "min-w-0",
            "space-x-2",
            "w-full",
            "min-w-0"
          )}
        >
          <label htmlFor={label} className={classnames("whitespace-nowrap")}>
            {label}
          </label>
          <div className={classnames("w-full", "flex", "justify-end")}>
            {type === "currency" && "$"}
            <input
              id={label}
              type="number"
              value={value ?? 0}
              onChange={(e) => onChange(Number(e.target.value))}
              min={min}
              max={max}
              className={classnames("w-32", "font-semibold", "text-right")}
            />
          </div>
        </div>
        <input
          id={label}
          type="range"
          value={value ?? 0}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className={classnames("w-full")}
        />
      </div>
      <p className={classnames("text-red-400", "text-sm", "h-5")}>
        {errorMessage}
      </p>
    </div>
  );
};
