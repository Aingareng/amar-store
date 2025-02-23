import Table from "../../../shared/components/organisms/Table";
import EmployeeFilter from "./EmployeeFilter";

export default function Employees() {
  return (
    <main className="grid grid-cols-1 gap-3 bg-base-100 p-4 rounded-2xl">
      <div>
        <EmployeeFilter />
      </div>
      <Table />
    </main>
  );
}
