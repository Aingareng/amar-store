import React, { InputHTMLAttributes } from "react";

interface IProps {
  label?: string;
  children: React.ReactNode;
  attributes?: InputHTMLAttributes<HTMLInputElement>;
}

export default function RadioButton({ label, attributes, children }: IProps) {
  return (
    <div className="form-control" {...attributes}>
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        {children}
      </label>
    </div>
  );
}
