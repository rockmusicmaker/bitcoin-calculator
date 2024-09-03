import React from "react";
import classnames from "classnames";

export type LabeledValueProps = {
  label: string;
  value: string | number | undefined;
};

export const LabeledValue: React.FC<LabeledValueProps> = ({
  label,
  value = "-",
}) => {
  return (
    <div
      className={classnames(
        "flex",
        "min-w-0",
        "space-x-2",
        "whitespace-nowrap"
      )}
    >
      <div className={classnames("flex", "truncate")}>{label}</div>
      <div className={classnames("flex", "min-w-fit")}>{value}</div>
    </div>
  );
};
