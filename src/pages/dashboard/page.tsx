import Navbar from "../../shared/components/organisms/Navbar";
import Table from "../../shared/components/organisms/Table";
import DashboardLayout from "./layout";

export default function Home() {
  return (
    <DashboardLayout>
      <header>
        <Navbar />
      </header>
      <main className="p-5">
        <Table />
      </main>
    </DashboardLayout>
  );
}
