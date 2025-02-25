import { ReactNode } from "react";

interface IProps {
  tableHead: ReactNode;
  children: ReactNode;
}

export default function Table({ tableHead, children }: IProps) {
  const defaultTableHead = (
    <tr>
      <th></th>
      <th>Column 1</th>
      <th>Column 2</th>
      <th>Column 3</th>
      <th>Column 4</th>
    </tr>
  );

  const defaultTableBody = (
    <tr>
      <th>1</th>
      <td>Row 1</td>
      <td>Row 1</td>
      <td>Row 1</td>
      <td>Row 1</td>
    </tr>
  );

  return (
    <div className="overflow-x-auto border rounded-2xl">
      <table className="table">
        {/* head */}
        <thead className="bg-primary *:text-white">
          {tableHead ? tableHead : defaultTableHead}
        </thead>
        <tbody>
          {/* row 1 */}

          {children ? children : defaultTableBody}
        </tbody>
      </table>
    </div>
  );
}
