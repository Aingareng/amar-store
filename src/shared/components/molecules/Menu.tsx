import React from "react";

interface IProps {
  attr?: React.HTMLAttributes<HTMLMenuElement>;
  children: React.ReactNode;
}

export default function Menu({ children, attr }: IProps) {
  return <menu {...attr}>{children}</menu>;
}
