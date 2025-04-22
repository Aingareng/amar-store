import { useCallback, useEffect, useRef, useState } from "react";
import { FilterValues } from "../../../../shared/components/organisms/TableFilter";
import Table from "../../../../shared/components/organisms/Table";
import { ISkillTableData } from "../../../../features/settings/skill/types/skill";
import Button from "../../../../shared/components/atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import useSkillCriteria from "../../../../features/settings/skill/hooks/useSkillCriteria";
import { formatString } from "../../../../shared/utils/stringFormatter";
import Dropdown from "../../../../shared/components/molecules/Dropdown";
import List from "../../../../shared/components/atoms/List";
import InsertUpdateModal from "../../../../features/settings/skill/components/InsertUpdateModal";
import { useToast } from "../../../../shared/hooks/useToast";
import SkillCriteriaFilter from "../../../../features/settings/skill/components/SkillCriteriaFilter";
import localStorageUtils from "../../../../shared/utils/localStorage";

export default function SkillPage() {
  const { Toast, showToast } = useToast();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [itemId, setItemId] = useState<number | null>(null);
  const [disableAddButton, setDisableAddButton] = useState<boolean>(false);

  const [filterValue, setFilterValue] = useState<FilterValues>();

  const { skillCriterias, destroySkillCriteria } = useSkillCriteria({
    search: filterValue?.search || "",
  });

  const tableHeadContent = (
    <tr>
      <th>No</th>
      <th>Nama Keahlian</th>
      <th>Bobot</th>
      <th>Aksi</th>
    </tr>
  );

  let tableBodyContent: ISkillTableData[] = [];

  if (skillCriterias && skillCriterias.data.length > 0) {
    tableBodyContent = skillCriterias.data;
  }

  function handleAddSkill() {
    if (disableAddButton) {
      showToast({
        type: "warning",
        message: "Bobot tidak bisa lebih dari 100",
      });

      return;
    }

    localStorageUtils.set<ISkillTableData[]>(
      "skillCriteria",
      skillCriterias?.data || []
    );

    setItemId(null);
    dialogRef.current?.showModal();
  }

  async function handleTableAction(id: number, type: "EDIT" | "DESTROY") {
    setItemId(id);
    if (type === "DESTROY") {
      const result = await destroySkillCriteria(id);
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
    if (skillCriterias && skillCriterias.data.length > 0) {
      const totalWeight = skillCriterias.data.reduce(
        (prev, current) => prev + current.weight,
        0
      );
      if (totalWeight >= 100) {
        setDisableAddButton(true);
      } else {
        setDisableAddButton(false);
      }
    }
  }, [skillCriterias]);

  return (
    <div className="grid grid-cols-1 gap-5">
      <Toast />
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daftar Keahlian</h1>
        <Button
          attributes={{
            type: "button",
            className: "btn btn-primary w-max",
            onClick: handleAddSkill,
            // disabled: disableAddButton,
          }}
        >
          <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
          Tambah Keahlian
        </Button>
      </header>
      <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
        <SkillCriteriaFilter
          filterResults={(result) => setFilterValue(result)}
        />
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
                </Dropdown>
              </th>
            </tr>
          ))}
        </Table>
      </main>

      <InsertUpdateModal
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
