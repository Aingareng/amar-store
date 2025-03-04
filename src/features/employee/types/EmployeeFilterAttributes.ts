import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from "react";

const searchAttr: InputHTMLAttributes<HTMLInputElement> = {
  type: "text",
  name: "search-employee",
  placeholder: "Cth : Nama,email,No.Hp,Posisi",
  className: "input input-bordered w-full max-w-xs",
};
const buttAttr: ButtonHTMLAttributes<HTMLButtonElement> = {
  type: "submit",
  className: "btn btn-primary btn-square",
};
const buttResetAttr: ButtonHTMLAttributes<HTMLButtonElement> = {
  type: "reset",
  className: "btn btn-primary btn-outline btn-square",
};
const formAttr: FormHTMLAttributes<HTMLFormElement> = {
  className: "flex items-end gap-2 ",
};

const EmployeeFilterAttributes = {
  searchAttr,
  buttAttr,
  buttResetAttr,
  formAttr,
};

export default EmployeeFilterAttributes;
