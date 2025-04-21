import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../shared/components/atoms/Button";
import { ChangeEvent, useState } from "react";
import TableFilter, {
  FilterValues,
} from "../../../../shared/components/organisms/TableFilter";
import Table from "../../../../shared/components/organisms/Table";
import { ILeadershipTableData } from "../../../../features/settings/leadership/types/leadership";

export default function LeadershipPage() {
  const [enteredValues, setEnteredValues] = useState<FilterValues>({
    search: "",
  });

  function handleSubmitFilter(filterValue: FilterValues) {
    console.log(filterValue);
  }

  function handleResetFilter() {
    setEnteredValues({
      search: "",
    });
  }

  const tableBodyContent: ILeadershipTableData[] = [
    {
      id: 1,
      skill_name: "Disiplin",
      weight: 100,
    },
  ];

  function handleAddCriteria() {}

  const tableHeadContent = (
    <tr>
      <th>No</th>
      <th>Nama Keahlian</th>
      <th>Bobot</th>
      <th>Aksi</th>
    </tr>
  );

  return (
    <div className="grid grid-cols-1 gap-5">
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
        <TableFilter
          onSubmit={handleSubmitFilter}
          onReset={handleResetFilter}
          className="grid grid-cols-[310px_310px_1fr] items-end gap-2"
          searchInput={{
            useSearchInput: true,
            label: "Cari Keahlian",
            placeholder: "Masukan nama keahlian",
            value: enteredValues.search || "",
            onChange: (event: ChangeEvent<HTMLInputElement>) => {
              setEnteredValues((prev) => {
                return {
                  ...prev,
                  search: event.target.value,
                };
              });
            },
          }}
        />

        <Table tableHead={tableHeadContent}>
          {tableBodyContent.map((item, idx) => (
            <tr key={item.id}>
              <th>{idx + 1}</th>
              <td>{item.skill_name}</td>
              <td>{item.weight}</td>
              <td>Aksi</td>
            </tr>
          ))}
        </Table>
      </main>
    </div>
  );
}
