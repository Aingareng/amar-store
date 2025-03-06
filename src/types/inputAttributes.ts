import { InputHTMLAttributes } from "react";

export const checkBoxInputAttibutes: InputHTMLAttributes<HTMLInputElement> = {
  type: "checkbox",
};

export const getCheckBoxAttributes = (
  additionalProps?: InputHTMLAttributes<HTMLInputElement>
): InputHTMLAttributes<HTMLInputElement> => {
  return {
    type: "checkbox",
    ...additionalProps, // memungkinkan override default properties
  };
};
