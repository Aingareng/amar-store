import React from "react";

interface IProps {
  children: React.ReactNode;
  attr?: React.HTMLAttributes<HTMLLIElement>;
}

export default function List({ attr, children }: IProps) {
  return <li {...attr}>{children}</li>;
}
