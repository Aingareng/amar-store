import { useState } from "react";
import Dropdown from "../../../shared/components/molecules/Dropdown";
import Table from "../../../shared/components/organisms/Table";
import Whatsapp from "../../../shared/icons/Whatsapp";
import { formatString } from "../../../shared/utils/stringFormatter";

import useEmployees from "../hooks/useEmployee";
import EmployeeFilter from "./EmployeeFilter";
import Toast from "../../../shared/components/molecules/Toast";
import Alert from "../../../shared/components/atoms/Alert";
import List from "../../../shared/components/atoms/List";
import { Link } from "react-router-dom";
import Button from "../../../shared/components/atoms/Button";
import Loading from "../../../shared/components/atoms/Loading";
import EmptyTableData from "../../../shared/components/molecules/EmptyTableData";

export default function Employees() {
  const [toastStatus, setToastStatus] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const { employees, deleteEmployee, isLoading, isPending, isFetching } =
    useEmployees({
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

  if (isLoading || (isPending && isFetching)) {
    return <Loading loadingType="loading-bars" />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
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

      {employees && employees.data.length === 0 && (
        <EmptyTableData
          title="Data Karyawan kosong"
          text="Silahkan menambahkan karyawan terlebih dahulu"
        />
      )}

      {employees && employees?.data.length > 0 && (
        <Table tableHead={tableHead}>
          {employees.data.map((item, index) => (
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
              <td>{item.score}</td>

              <th>
                <Dropdown onAction={handleDestroyEmployee}>
                  <List>
                    <Link to={`/employee-details/${item.id}`}>Detail</Link>
                  </List>
                  <List>
                    <Button
                      attributes={{
                        onClick: () => handleDestroyEmployee(item.id),
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
      )}
    </div>
  );
}
