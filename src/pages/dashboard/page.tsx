import { ButtonHTMLAttributes, useRef } from "react";
import Employees from "../../features/employee/components/Employees";
import Button from "../../shared/components/atoms/Button";
import DashboardLayout from "./layout";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreateEmployee from "../../features/employee/components/CreateEmployee";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const btnAttt: ButtonHTMLAttributes<HTMLButtonElement> = {
    className: "btn btn-primary w-max ",
    onClick: () => {
      dialogRef.current?.showModal();
    },
  };
  return (
    <DashboardLayout>
      <CreateEmployee ref={dialogRef} />

      <section className="grid grid-cols-1 gap-5">
        <header className=" flex justify-between items-center">
          <h1 className="text-3xl font-bold">Daftar Pegawai</h1>
          <Button attributes={btnAttt}>
            <Icon
              icon="material-symbols:add-2-rounded"
              width="24"
              height="24"
            />
            Tambah Pegawai
          </Button>
        </header>
        <Employees />
      </section>
    </DashboardLayout>
  );
}
