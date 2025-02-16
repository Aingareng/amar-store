import React, { ForwardedRef } from "react";
import Modal from "../../../shared/components/organisms/Modal";
import Form from "../../../shared/components/molecules/Form";
import Label from "../../../shared/components/atoms/Label";
import Input from "../../../shared/components/atoms/Input";
import Button from "../../../shared/components/atoms/Button";

interface IProps {
  ref: ForwardedRef<HTMLDialogElement>;
}

export default function CreateEmployee({ ref }: IProps) {
  const inputEmailAttr: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "email",
    name: "email",
    className: "input input-bordered w-full",
    placeholder: "Cth: John@example.com",
  };
  const inputIdentityNumber: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "password",
    name: "password",
    className: "input input-bordered w-full",
    placeholder: "Masukan NIP",
  };
  const inputPosition: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "text",
    name: "position",
    className: "input input-bordered w-full",
    placeholder: "Cth: Manager",
  };
  const inputPhoneNumber: React.InputHTMLAttributes<HTMLInputElement> = {
    type: "text",
    name: "phone-number",
    className: "input input-bordered w-full",
    placeholder: "Cth: 08xxxxxxx",
  };
  const formAttr: React.FormHTMLAttributes<HTMLFormElement> = {
    className: "grid grid-cols-1 gap-2",
  };
  const submitAttr: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "submit",
    className: "btn btn-primary w-max",
  };
  return (
    <Modal ref={ref}>
      <div className="grid grid-cols-1 gap-5 ">
        <h3 className="text-center text-xl">Tambah Pegawai</h3>
        <Form attributes={formAttr}>
          <main className="grid grid-cols-2 gap-2">
            <Label labelType="form-control" leftLabel="Alamat Email">
              <Input attributes={inputEmailAttr} />
            </Label>
            <Label labelType="form-control" leftLabel="Nomor Identitas">
              <Input attributes={inputIdentityNumber} />
            </Label>
            <Label labelType="form-control" leftLabel="Posisi">
              <Input attributes={inputPosition} />
            </Label>
            <Label labelType="form-control" leftLabel="No Handphone">
              <Input attributes={inputPhoneNumber} />
            </Label>
          </main>
          <div className="flex w-full flex-col">
            <div className="divider divider-start">Keahlian</div>
          </div>

          {/* Action */}
          <footer className="flex justify-end gap-2 mt-3">
            <Button attributes={{ className: "btn btn-outline btn-error" }}>
              Batal
            </Button>
            <Button attributes={submitAttr}>Tambah</Button>
          </footer>
        </Form>
      </div>
    </Modal>
  );
}
