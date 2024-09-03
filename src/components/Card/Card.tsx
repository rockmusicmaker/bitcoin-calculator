import React, { ReactNode } from "react";
import classnames from "classnames";
export type CardProps = { children: ReactNode };

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div
      className={classnames(
        "bg-neutral-50",
        "flex",
        "flex-col",
        "w-full",
        "rounded-lg",
        "shadow-md",
        "py-4",
        "px-8",
        "overflow-y-auto",
        "h-fit"
      )}
    >
      {children}
    </div>
  );
};
