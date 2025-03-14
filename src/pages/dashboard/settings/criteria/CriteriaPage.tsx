import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../shared/components/atoms/Button";
import CriteriaTable from "../../../../features/settings/criteria/components/CriteriaTable";
import { useCallback, useRef, useState } from "react";
import Modal from "../../../../shared/components/organisms/Modal";
import InsertUpdateCriteria from "../../../../features/settings/criteria/components/InsertUpdateCriteria";
import CriteriaFilter from "../../../../features/settings/criteria/components/CriteriaFilter";
import useCriteria from "../../../../features/settings/criteria/hooks/useCriteria";

export default function CriteriaPage() {
  const destroyDialogRef = useRef<HTMLDialogElement>(null);
  const insertEditDialogRef = useRef<HTMLDialogElement>(null);
  const [itemId, setItemId] = useState<number>();
  const [insertUpdateDialog, setInserUpdateDialog] = useState<
    "UPDATE" | "CREATE"
  >();
  const [searchValue, setSearchValue] = useState("");

  const { criterias } = useCriteria({
    search: searchValue,
  });

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
  function handleFilterTable(value: string) {
    setSearchValue(value);
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
      <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
        <CriteriaFilter onSearch={handleFilterTable} />

        <CriteriaTable
          criteriaData={criterias}
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
