import Whatsapp from "../../icons/Whatsapp";
import { dummyData } from "../../utils/dummy";
import Dropdown from "../molecules/Dropdown";

export default function Table() {
  return (
    <div className="overflow-x-auto border rounded-2xl">
      <table className="table">
        {/* head */}
        <thead className="bg-primary *:text-white">
          <tr>
            <th></th>
            <th>Nama</th>
            <th>Jabatan</th>
            <th>Nilai Skor</th>
            <th>Peringkat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {dummyData.map((item, index) => (
            <tr key={index} className="hover">
              <th>{item.id}</th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="grid grid-cols-1 gap-1">
                    <p className="font-bold">{item.nama}</p>
                    <div className="text-sm opacity-50 flex items-center text-success">
                      <Whatsapp /> <span className="text-xs">{item.no_wa}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td>{item.posisi}</td>
              <td>{item.nilaiSkor}</td>
              <td>{item.peringkat}</td>

              <th>
                <Dropdown itemIndex={item.id} />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
