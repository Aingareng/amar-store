import { Icon } from "@iconify/react/dist/iconify.js";

import { ICriteriaDatas } from "../../../../features/settings/criteria/types/criteria";
import Button from "../../../../shared/components/atoms/Button";
import CriteriaTable from "../../../../features/settings/criteria/components/CriteriaTable";
import { useCallback, useRef, useState } from "react";
import Modal from "../../../../shared/components/organisms/Modal";
import InsertUpdateCriteria from "../../../../features/settings/criteria/components/InsertUpdateCriteria";

export default function CriteriaPage() {
  const destroyDialogRef = useRef<HTMLDialogElement>(null);
  const insertEditDialogRef = useRef<HTMLDialogElement>(null);
  const [itemId, setItemId] = useState<number>();
  const [insertUpdateDialog, setInserUpdateDialog] = useState<
    "UPDATE" | "CREATE"
  >();

  const criteriaDatas: ICriteriaDatas[] = [
    {
      id: 1,
      criteria_code: "CR001",
      criteria_name: "Quality",
      criteria_bobot: 0.3,
      criteria_type: "Benefit",
      criteria_priority: 1,
    },
    {
      id: 2,
      criteria_code: "CR002",
      criteria_name: "Cost",
      criteria_bobot: 0.25,
      criteria_type: "Cost",
      criteria_priority: 2,
    },
    {
      id: 3,
      criteria_code: "CR003",
      criteria_name: "Delivery Time",
      criteria_bobot: 0.2,
      criteria_type: "Benefit",
      criteria_priority: 3,
    },
    {
      id: 4,
      criteria_code: "CR004",
      criteria_name: "Customer Service",
      criteria_bobot: 0.15,
      criteria_type: "Benefit",
      criteria_priority: 4,
    },
    {
      id: 5,
      criteria_code: "CR005",
      criteria_name: "Reputation",
      criteria_bobot: 0.1,
      criteria_type: "Benefit",
      criteria_priority: 5,
    },
  ];

  const handleTableAction = useCallback(
    (id: number, type: "EDIT" | "DESTROY") => {
      setItemId(id);

      if (type === "EDIT" && id) {
        insertEditDialogRef.current?.showModal();
        setInserUpdateDialog("UPDATE");
      }
      if (type === "DESTROY" && id) {
        destroyDialogRef.current?.showModal();
      }
    },
    []
  );

  function handleDestroyCriteria(id: number) {
    console.log(id);
  }
  function handleAddCriteria() {
    setInserUpdateDialog("CREATE");
    insertEditDialogRef.current?.showModal();
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      <header className=" flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daftar Kriteria</h1>
        <Button
          attributes={{
            className: "btn btn-primary",
            onClick: handleAddCriteria,
          }}
        >
          <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
          Tambah Kriteria
        </Button>
      </header>
      <main className="bg-base-100">
        <CriteriaTable
          criteriaData={criteriaDatas}
          tableAction={handleTableAction}
        />
      </main>
      {/* Modal section */}
      <InsertUpdateCriteria
        modalType={insertUpdateDialog as "UPDATE" | "CREATE"}
        ref={insertEditDialogRef}
      />

      <Modal ref={destroyDialogRef}>
        <section className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-2xl font-semibold">Yakin ingin dihapus ?</h1>
          <div className="flex gap-2">
            <Button
              attributes={{
                className: "btn btn-outline btn-error",
                onClick: () => destroyDialogRef.current?.close(),
              }}
            >
              Batal
            </Button>
            <Button
              attributes={{
                className: "btn btn-primary",
                onClick: () => handleDestroyCriteria(itemId as number),
              }}
            >
              Hapus
            </Button>
          </div>
        </section>
      </Modal>
    </div>
  );
}
