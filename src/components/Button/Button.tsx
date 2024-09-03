import React from "react";
import classnames from "classnames";

export type ButtonProps = { label: string; onClick: () => void };

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classnames(
        "flex",
        "justify-center",
        "items-center",
        "p-2",
        "bg-blue-600",
        "text-blue-50",
        "rounded-lg",
        "w-fit",
        "hover:bg-blue-700"
      )}
    >
      {label}
    </button>
  );
};
