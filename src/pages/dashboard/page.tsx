import { ButtonHTMLAttributes, useRef, useState } from "react";
import Employees from "../../features/employee/components/Employees";
import Button from "../../shared/components/atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import CreateEmployee from "../../features/employee/components/CreateEmployee";
import Toast from "../../shared/components/molecules/Toast";
import Alert from "../../shared/components/atoms/Alert";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [toastStatus, setToastStatus] = useState(false);

  const btnAttt: ButtonHTMLAttributes<HTMLButtonElement> = {
    className: "btn btn-primary w-max ",
    onClick: () => {
      dialogRef.current?.showModal();
    },
  };

  function handleShowToast(status: boolean) {
    setToastStatus(status);
    dialogRef.current?.close();
  }
  return (
    <>
      <CreateEmployee
        ref={dialogRef}
        onShowToast={handleShowToast}
        onClose={() => dialogRef.current?.close()}
      />
      {toastStatus && (
        <Toast>
          <Alert>
            <span>Berhasil menambahkan Staff</span>
          </Alert>
        </Toast>
      )}

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
    </>
  );
}
