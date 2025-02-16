import {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
} from "react";
import Input from "../../../shared/components/atoms/Input";
import Form from "../../../shared/components/molecules/Form";
import Button from "../../../shared/components/atoms/Button";
import { Icon } from "@iconify/react";
import Label from "../../../shared/components/atoms/Label";

export default function EmployeeFilter() {
  const searchAttr: InputHTMLAttributes<HTMLInputElement> = {
    type: "text",
    name: "search-employee",
    placeholder: "Cth : Nama,NIP,Skor",
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

  return (
    <Form attributes={formAttr}>
      <Label
        labelType="form-control"
        leftLabel="Cari Pegawai"
        className="w-full max-w-xs"
      >
        <Input attributes={searchAttr} />
      </Label>
      <div className="flex gap-1">
        <Button attributes={buttAttr}>
          <Icon
            icon="material-symbols:search-rounded"
            width="24"
            height="24"
            className="text-white"
          />
        </Button>
        <Button attributes={buttResetAttr}>
          <Icon icon="material-symbols:refresh" width="24" height="24" />
        </Button>
      </div>
    </Form>
  );
}
