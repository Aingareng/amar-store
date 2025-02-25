import { useState } from "react";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import Table from "../../../shared/components/organisms/Table";
import Whatsapp from "../../../shared/icons/Whatsapp";
import { formatString } from "../../../shared/utils/stringFormatter";

import useEmployees from "../hooks/useEmployee";
import EmployeeFilter from "./EmployeeFilter";

export default function Employees() {
  const [searchInput, setSearchInput] = useState("");
  const { employees } = useEmployees({
    search: searchInput,
  });

  function handleSearchInput(input: string) {
    setSearchInput(input);
  }

  const tableHead = (
    <tr>
      <th></th>
      <th>Nama</th>
      <th>Jabatan</th>
      <th>Nilai Skor</th>
      <th>Peringkat</th>
      <th>Aksi</th>
    </tr>
  );

  return (
    <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
      <div>
        <EmployeeFilter onSearch={handleSearchInput} />
      </div>
      <Table tableHead={tableHead}>
        {employees.map((item, index) => (
          <tr key={index} className="hover">
            <th>{item.id}</th>
            <td>
              <div className="flex items-center gap-3">
                <div className="grid grid-cols-1 gap-1">
                  <p className="font-bold">
                    {formatString(item.username, "capitalize")}
                  </p>
                  <div className="text-sm opacity-50 flex items-center text-success">
                    <Whatsapp /> <span className="text-xs">{item.phone}</span>
                  </div>
                </div>
              </div>
            </td>
            <td>{item.position}</td>
            <td>{item.final_score}</td>
            <td>{item.rangking}</td>

            <th>
              <Dropdown itemIndex={item.id} />
            </th>
          </tr>
        ))}
      </Table>
    </main>
  );
}
