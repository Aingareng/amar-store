import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../shared/components/atoms/Button";
import CriteriaTable from "../../../../features/settings/criteria/components/CriteriaTable";
import { useCallback, useRef, useState } from "react";
import Modal from "../../../../shared/components/organisms/Modal";
import InsertUpdateCriteria from "../../../../features/settings/criteria/components/InsertUpdateCriteria";
import CriteriaFilter from "../../../../features/settings/criteria/components/CriteriaFilter";
import useCriteria from "../../../../features/settings/criteria/hooks/useCriteria";
import EmptyTableData from "../../../../shared/components/molecules/EmptyTableData";
import Loading from "../../../../shared/components/atoms/Loading";
import Toast from "../../../../shared/components/molecules/Toast";
import Alert from "../../../../shared/components/atoms/Alert";
import { useCriteriaById } from "../../../../features/settings/criteria/hooks/useCriteriaById";
import { ICriteriaData } from "../../../../features/settings/criteria/types/criteria";

export default function CriteriaPage() {
  const destroyDialogRef = useRef<HTMLDialogElement>(null);
  const insertEditDialogRef = useRef<HTMLDialogElement>(null);
  const [itemId, setItemId] = useState<number | null>(null);
  const [insertUpdateDialog, setInserUpdateDialog] = useState<
    "UPDATE" | "CREATE" | "DESTROY"
  >();
  const [searchValue, setSearchValue] = useState("");
  const [toastStatus, setToastStatus] = useState(false);

  const { criterias, isPending, isFetching, deleteCriteria } = useCriteria({
    search: searchValue,
  });

  const { data: criteria } = useCriteriaById(itemId);

  const handleTableAction = useCallback(
    (id: number, type: "EDIT" | "DESTROY") => {
      setItemId(id);

      if (type === "EDIT" && id) {
        setInserUpdateDialog("UPDATE");
        insertEditDialogRef.current?.showModal();
      }
      if (type === "DESTROY") {
        insertEditDialogRef.current?.close();
        destroyDialogRef.current?.showModal();
      }
    },
    []
  );

  async function handleDestroyCriteria(id: number) {
    const result = await deleteCriteria(id);
    if (result.status === 200) {
      destroyDialogRef.current?.close();
      setToastStatus(false);
    }

    setItemId(null);
  }
  function handleAddCriteria() {
    setInserUpdateDialog("CREATE");
    insertEditDialogRef.current?.showModal();
  }
  function handleFilterTable(value: string) {
    setSearchValue(value);
  }
  function handleShowToast(status: boolean) {
    setToastStatus(status);
    insertEditDialogRef.current?.close();
  }

  let mainContent = (
    <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
      <CriteriaFilter onSearch={handleFilterTable} />

      <CriteriaTable criteriaData={criterias} tableAction={handleTableAction} />
    </main>
  );

  if (criterias.length < 1) {
    mainContent = (
      <EmptyTableData
        title="Data kriteria kosong"
        text="Silakan tambahkan kriteria"
      />
    );
  }

  if (isFetching || isPending) {
    mainContent = <Loading loadingType="loading-bars" />;
  }

  let toastContent = "";

  if (insertUpdateDialog === "CREATE") {
    toastContent = "menambah";
  }
  if (insertUpdateDialog === "UPDATE") {
    toastContent = "mengubah";
  }
  if (insertUpdateDialog === "DESTROY") {
    toastContent = "menghapus";
  }

  return (
    <div className="grid grid-cols-1 gap-5">
      {toastStatus && (
        <Toast>
          <Alert>
            <span>Berhasil {toastContent} kriteria</span>
          </Alert>
        </Toast>
      )}
      <header className=" flex justify-between items-center ">
        <h1 className="text-3xl font-bold">Daftar Kriteria</h1>
        <Button
          attributes={{
            className: `btn btn-primary ${
              criterias.length === 5 ? "cursor-not-allowed" : ""
            }`,
            onClick: handleAddCriteria,
            disabled: criterias.length === 5,
          }}
        >
          <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
          Tambah Kriteria
        </Button>
      </header>

      {mainContent}

      {/* Modal section */}
      <InsertUpdateCriteria
        modalType={insertUpdateDialog as "UPDATE" | "CREATE"}
        ref={insertEditDialogRef}
        defaultValue={criteria as ICriteriaData}
        onShowToast={handleShowToast}
        dataFromTable={criterias}
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
