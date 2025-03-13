import List from "../../../../shared/components/atoms/List";
import Dropdown from "../../../../shared/components/molecules/Dropdown";
import Table from "../../../../shared/components/organisms/Table";
import { ICriteriaDatas } from "../types/criteria";
import Button from "../../../../shared/components/atoms/Button";
import { memo } from "react";

interface IProps {
  criteriaData: ICriteriaDatas[];
  tableAction: (id: number, type: "EDIT" | "DESTROY") => void;
}

function CriteriaTable({ criteriaData, tableAction }: IProps) {
  const defaultTableHead = (
    <tr>
      <th>No</th>
      <th>No Kriteria</th>
      <th>Nama Kriteria</th>
      <th>Bobot</th>
      <th>Jenis</th>
      <th>Tingkat Prioritas</th>
      <th>Aksi</th>
    </tr>
  );

  return (
    <div>
      <Table tableHead={defaultTableHead}>
        {criteriaData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.criteria_code}</td>
            <td>{item.criteria_name}</td>
            <td>{item.criteria_bobot}</td>
            <td>{item.criteria_type}</td>
            <td>{item.criteria_priority}</td>
            <th>
              <Dropdown>
                <List>
                  <Button
                    attributes={{
                      className: "cursor-pointer",
                      onClick: () => tableAction(item.id as number, "EDIT"),
                    }}
                  >
                    Edit
                  </Button>
                </List>
                <List>
                  <Button
                    attributes={{
                      onClick: () => tableAction(item.id as number, "DESTROY"),
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
    </div>
  );
}

export default memo(CriteriaTable);
