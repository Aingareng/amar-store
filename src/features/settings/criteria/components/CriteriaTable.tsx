import Table from "../../../../shared/components/organisms/Table";
import { formatString } from "../../../../shared/utils/stringFormatter";
import { ICriteriaDatas } from "../types/criteria";

import { memo } from "react";

interface IProps {
  criteriaData: ICriteriaDatas[];
  tableAction?: (id: number, type: "EDIT" | "DESTROY") => void;
}

function CriteriaTable({ criteriaData }: IProps) {
  const defaultTableHead = (
    <tr>
      <th>No</th>
      <th>No Kriteria</th>
      <th>Nama Kriteria</th>
      <th>Bobot</th>
      <th>Jenis</th>
      <th>Tingkat Prioritas</th>
      {/* <th>Aksi</th> */}
    </tr>
  );

  return (
    <div>
      <Table tableHead={defaultTableHead}>
        {criteriaData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.code}</td>
            <td>{item.name}</td>
            <td>{item.weight}</td>
            <td>{formatString(item.type || "", "capitalize")}</td>
            <td>{item.rank_order}</td>
            {/* <th>
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
            </th> */}
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default memo(CriteriaTable);
