import React from "react";

interface IProps {
  attributes: React.InputHTMLAttributes<HTMLInputElement>;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLInputElement | null>;
}

const Input = ({ ref, attributes, children }: IProps) => {
  return (
    <>
      {children}
      <input ref={ref} {...attributes} />
    </>
  );
};

export default Input;
