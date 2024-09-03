import React from "react";
import classnames from "classnames";

export type NumberPickerProps = {
  label: string;
  value: number | undefined;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  errorMessage: string | undefined;
};

export const NumberPicker: React.FC<NumberPickerProps> = ({
  label,
  onChange,
  value,
  max,
  min,
  errorMessage,
}) => {
  return (
    <div className={classnames("flex", "flex-col", "min-w-0", "space-y-1")}>
      <div className={classnames("flex", "min-w-0", "space-x-2")}>
        <label htmlFor={label}>{label}</label>
        <input
          id={label}
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
        />
      </div>
      <p className={classnames("text-red-400", "text-sm", "h-5")}>
        {errorMessage}
      </p>
    </div>
  );
};
