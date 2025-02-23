import React from "react";

interface IProps {
  attributes: React.InputHTMLAttributes<HTMLInputElement>;
  children?: React.ReactNode;
}

const Input = ({ attributes, children }: IProps) => {
  return (
    <>
      {children}
      <input {...attributes} />
    </>
  );
};

export default Input;
