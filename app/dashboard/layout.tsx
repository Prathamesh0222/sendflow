import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
