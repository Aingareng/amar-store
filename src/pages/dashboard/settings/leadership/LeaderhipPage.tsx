import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../shared/components/atoms/Button";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilterValues } from "../../../../shared/components/organisms/TableFilter";
import Table from "../../../../shared/components/organisms/Table";
import { ILeadershipTableData } from "../../../../features/settings/leadership/types/leadership";
import LeadershipCriteriaFilter from "../../../../features/settings/leadership/components/LeadershipCriteriaFilter";
import useLeaderhip from "../../../../features/settings/leadership/hooks/useLeaderhip";
import { formatString } from "../../../../shared/utils/stringFormatter";
import Dropdown from "../../../../shared/components/molecules/Dropdown";
import List from "../../../../shared/components/atoms/List";
import { useToast } from "../../../../shared/hooks/useToast";
import InsertUpdateLeadershipModal from "../../../../features/settings/leadership/components/InsertUpdateLeadershipModal";
import EmptyTableData from "../../../../shared/components/molecules/EmptyTableData";
import localStorageUtils from "../../../../shared/utils/localStorage";

export default function LeadershipPage() {
  const [enteredValues, setEnteredValues] = useState<FilterValues>({
    search: "",
  });
  const { Toast, showToast } = useToast();
  const [itemId, setItemId] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [disableAddButton, setDisableAddButton] = useState<boolean>(false);

  const { criterias, isFetched, destroyLeadership } = useLeaderhip({
    search: enteredValues.search || "",
  });

  let tableBodyContent: ILeadershipTableData[] = [];

  if (criterias && criterias.data.length > 0) {
    tableBodyContent = criterias.data;
  }

  function handleAddCriteria() {
    if (disableAddButton) {
      showToast({
        type: "warning",
        message: "Bobot tidak bisa lebih dari 100",
      });

      return;
    }

    localStorageUtils.set<ILeadershipTableData[]>(
      "leadershipCriteria",
      criterias?.data || []
    );

    setItemId(null);
    dialogRef.current?.showModal();
  }

  async function handleTableAction(id: number, type: "EDIT" | "DESTROY") {
    setItemId(id);
    if (type === "DESTROY") {
      const result = await destroyLeadership(id);
      if (result.status === 201) {
        showToast({
          type: result.status === 201 ? "success" : "error",
          message:
            result.status === 201
              ? "Berhasil menghapus keahlian"
              : "Berhasil menghapus keahlian",
        });
      }
    }

    if (type === "EDIT") {
      dialogRef.current?.showModal();
    }
  }

  const handleSendingStatus = useCallback(
    (statusCode: number | undefined) => {
      if (statusCode) {
        showToast({
          type: statusCode === 201 ? "success" : "error",
          message:
            statusCode === 201
              ? "Berhasil menambah keahlian"
              : "Berhasil menambah keahlian",
        });
      }

      if (statusCode && itemId) {
        showToast({
          type: statusCode === 201 ? "success" : "error",
          message:
            statusCode === 201
              ? "Berhasil mengubah keahlian"
              : "Berhasil mengubah keahlian",
        });
      }

      if (statusCode === 201) {
        dialogRef.current?.close();
      }
    },
    [itemId]
  );

  useEffect(() => {
    if (criterias && criterias.data.length > 0) {
      const totalWeight = criterias.data.reduce(
        (prev, current) => prev + current.weight,
        0
      );
      if (totalWeight >= 100) {
        setDisableAddButton(true);
      } else {
        setDisableAddButton(false);
      }
    }
  }, [criterias]);

  const tableHeadContent = (
    <tr>
      <th>No</th>
      <th>Nama Kriteria</th>
      <th>Bobot</th>
      <th>Aksi</th>
    </tr>
  );

  return (
    <div className="grid grid-cols-1 gap-5">
      <Toast />
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daftar Jiwa kepemimpinan</h1>
        <Button
          attributes={{
            type: "button",
            className: "btn btn-primary w-max",
            onClick: handleAddCriteria,
          }}
        >
          <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
          Tambah Kriteria
        </Button>
      </header>
      <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
        <LeadershipCriteriaFilter
          filterResults={(result) => setEnteredValues(result)}
        />

        {isFetched && criterias?.data.length === 0 && (
          <EmptyTableData
            title="Data kriteria kosong"
            text="Silahkan menambahkan kriteria terlebih dahulu"
          />
        )}

        {isFetched && criterias && criterias.data.length > 0 && (
          <Table tableHead={tableHeadContent}>
            {tableBodyContent.map((item, idx) => (
              <tr key={item.id}>
                <th>{idx + 1}</th>
                <td>{formatString(item.name, "capitalize")}</td>
                <td>{item.weight}</td>
                <th>
                  <Dropdown>
                    <List>
                      <Button
                        attributes={{
                          className: "cursor-pointer",
                          onClick: () =>
                            handleTableAction(item.id as number, "EDIT"),
                        }}
                      >
                        Edit
                      </Button>
                    </List>

                    {tableBodyContent.length > 1 && (
                      <List>
                        <Button
                          attributes={{
                            onClick: () =>
                              handleTableAction(item.id as number, "DESTROY"),
                          }}
                        >
                          Hapus
                        </Button>
                      </List>
                    )}
                  </Dropdown>
                </th>
              </tr>
            ))}
          </Table>
        )}
      </main>

      <InsertUpdateLeadershipModal
        ref={dialogRef}
        type={itemId ? "UPDATE" : "CREATE"}
        id={itemId as number}
        initialData={
          itemId ? tableBodyContent.find((item) => item.id === itemId) : null
        }
        onSendingStatus={handleSendingStatus}
      />
    </div>
  );
}
