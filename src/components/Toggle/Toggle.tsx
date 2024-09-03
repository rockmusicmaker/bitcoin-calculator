import React from "react";
import classnames from "classnames";

export type ToggleProps = {
  selected: string;
  options: { label: string; onClick: () => void }[];
};

export const Toggle: React.FC<ToggleProps> = ({ options }) => {
  return (
    <div
      className={classnames("flex", "flex-col", "px-8", "py-16", "space-y-8")}
    >
      {options.map(({ label, onClick }) => (
        <button onClick={onClick}>{label}</button>
      ))}
    </div>
  );
};
