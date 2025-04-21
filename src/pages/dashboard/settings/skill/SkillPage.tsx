import { ChangeEvent, useState } from "react";
import TableFilter, {
  FilterValues,
} from "../../../../shared/components/organisms/TableFilter";
import Table from "../../../../shared/components/organisms/Table";
import { ISkillTableData } from "../../../../features/settings/skill/types/skill";
import Button from "../../../../shared/components/atoms/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SkillPage() {
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

  const tableHeadContent = (
    <tr>
      <th>No</th>
      <th>Nama Keahlian</th>
      <th>Bobot</th>
      <th>Aksi</th>
    </tr>
  );

  const tableBodyContent: ISkillTableData[] = [
    {
      id: 1,
      name: "Microsoft Word",
      weight: 100,
    },
  ];

  function handleAddSkill() {}

  return (
    <div className="grid grid-cols-1 gap-5">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Daftar Keahlian</h1>
        <Button
          attributes={{
            type: "button",
            className: "btn btn-primary w-max",
            onClick: handleAddSkill,
          }}
        >
          <Icon icon="material-symbols:add-2-rounded" width="24" height="24" />
          Tambah Keahlian
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
              <td>{item.name}</td>
              <td>{item.weight}</td>
              <td>Aksi</td>
            </tr>
          ))}
        </Table>
      </main>
    </div>
  );
}
