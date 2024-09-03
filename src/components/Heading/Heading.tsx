import React, { ReactNode } from "react";

export type HeadingProps = { variant: "h1" | "h2" | "h3"; children: ReactNode };

export const Heading: React.FC<HeadingProps> = ({ variant, children }) => {
  const Component = variant;
  return <Component>{children}</Component>;
};
