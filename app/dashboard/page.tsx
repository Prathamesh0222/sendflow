import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Navbar />
    </div>
  );
};

export default Dashboard;
