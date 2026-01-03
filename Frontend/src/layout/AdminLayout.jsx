
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../components/AdminHeader";
import { AdminSideBar } from "../components/AdminSideBar";


export const AdminLayout = () => {
  return (
    <>
      {/* Header */}
      <AdminHeader />

      {/* Layout */}
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <aside>
          <AdminSideBar/>
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};