import { useState } from "react";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import Table from "../../../shared/components/organisms/Table";
import Whatsapp from "../../../shared/icons/Whatsapp";
import { formatString } from "../../../shared/utils/stringFormatter";

import useEmployees from "../hooks/useEmployee";
import EmployeeFilter from "./EmployeeFilter";
import Toast from "../../../shared/components/molecules/Toast";
import Alert from "../../../shared/components/atoms/Alert";

export default function Employees() {
  const [toastStatus, setToastStatus] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { employees, deleteEmployee } = useEmployees({
    search: searchInput,
  });

  function handleSearchInput(input: string) {
    setSearchInput(input);
  }
  async function handleDestroyEmployee(id: number) {
    const response = await deleteEmployee({ id: String(id) });
    if (response.status !== 400 && response.status !== 500) {
      setToastStatus(true);
    }
    setTimeout(() => {
      setToastStatus(false);
    }, 3000);
  }

  const tableHead = (
    <tr>
      <th></th>
      <th>Nama</th>
      <th>Jabatan</th>
      <th>Nilai Skor</th>
      <th>Aksi</th>
    </tr>
  );

  return (
    <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
      {toastStatus && (
        <Toast>
          <Alert>
            <span>Berhasil menghapus Staff</span>
          </Alert>
        </Toast>
      )}

      <div>
        <EmployeeFilter onSearch={handleSearchInput} />
      </div>
      <Table tableHead={tableHead}>
        {employees.map((item, index) => (
          <tr key={index} className="hover">
            <th>{index + 1}</th>
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

            <th>
              <Dropdown itemIndex={item.id} onAction={handleDestroyEmployee} />
            </th>
          </tr>
        ))}
      </Table>
    </main>
  );
}
