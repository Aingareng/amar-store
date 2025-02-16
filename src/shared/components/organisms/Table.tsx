import Dropdown from "../molecules/Dropdown";

export default function Table() {
  const dummyData = [
    {
      id: 1,
      nama: "Adi Ngareng",
      nip: "10101199",
      posisi: "Staff Manager",
      nilaiSkor: 0.907,
      peringkat: 1,
      avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      nip: "10101200",
      posisi: "Marketing Executive",
      nilaiSkor: 0.856,
      peringkat: 2,
      avatar: "https://img.daisyui.com/images/profile/demo/3@94.webp",
    },
    {
      id: 3,
      nama: "Citra Lestari",
      nip: "10101201",
      posisi: "HR Specialist",
      nilaiSkor: 0.832,
      peringkat: 3,
      avatar: "https://img.daisyui.com/images/profile/demo/4@94.webp",
    },
    {
      id: 4,
      nama: "Dewi Kusuma",
      nip: "10101202",
      posisi: "Finance Analyst",
      nilaiSkor: 0.821,
      peringkat: 4,
      avatar: "https://img.daisyui.com/images/profile/demo/5@94.webp",
    },
    {
      id: 5,
      nama: "Eko Prasetyo",
      nip: "10101203",
      posisi: "IT Support",
      nilaiSkor: 0.815,
      peringkat: 5,
      avatar: "https://img.daisyui.com/images/profile/demo/6@94.webp",
    },
    // {
    //   id: 6,
    //   nama: "Fani Wijaya",
    //   nip: "10101204",
    //   posisi: "Sales Manager",
    //   nilaiSkor: 0.798,
    //   peringkat: 6,
    //   avatar: "https://img.daisyui.com/images/profile/demo/7@94.webp",
    // },
    // {
    //   id: 7,
    //   nama: "Gita Ayu",
    //   nip: "10101205",
    //   posisi: "Product Manager",
    //   nilaiSkor: 0.789,
    //   peringkat: 7,
    //   avatar: "https://img.daisyui.com/images/profile/demo/8@94.webp",
    // },
    // {
    //   id: 8,
    //   nama: "Hadi Nugroho",
    //   nip: "10101206",
    //   posisi: "Operations Manager",
    //   nilaiSkor: 0.776,
    //   peringkat: 8,
    //   avatar: "https://img.daisyui.com/images/profile/demo/9@94.webp",
    // },
    // {
    //   id: 9,
    //   nama: "Indra Setiawan",
    //   nip: "10101207",
    //   posisi: "Quality Assurance",
    //   nilaiSkor: 0.765,
    //   peringkat: 9,
    //   avatar: "https://img.daisyui.com/images/profile/demo/10@94.webp",
    // },
    // {
    //   id: 10,
    //   nama: "Joko Widodo",
    //   nip: "10101208",
    //   posisi: "Customer Service",
    //   nilaiSkor: 0.752,
    //   peringkat: 10,
    //   avatar: "https://img.daisyui.com/images/profile/demo/11@94.webp",
    // },
  ];

  return (
    <div className="overflow-x-auto border rounded-2xl">
      <table className="table">
        {/* head */}
        <thead className="bg-primary *:text-white">
          <tr>
            <th></th>
            <th>Nama</th>
            <th>Posisi</th>
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
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.nama}</div>
                    <div className="text-sm opacity-50">NIP : {item.nip}</div>
                  </div>
                </div>
              </td>
              <td>{item.posisi}</td>
              <td>{item.nilaiSkor}</td>
              <td>{item.peringkat}</td>

              <th>
                <Dropdown />
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
