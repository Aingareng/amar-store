import Input from "../atoms/Input";

import { InputHTMLAttributes } from "react";

interface IProps {
  label?: string;
  inputAttr: InputHTMLAttributes<HTMLInputElement>;
}

export default function Checkbox({ label, inputAttr }: IProps) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label ">
        {label && <span className="label-text text-xs">{label}</span>}
        <Input attributes={inputAttr} />
      </label>
    </div>
  );
}
