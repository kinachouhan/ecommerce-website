
import { Outlet , Navigate} from "react-router-dom";
import { AdminHeader } from "../components/AdminHeader";
import { AdminSideBar } from "../components/AdminSideBar";
import { useEffect, useState } from "react";




export const AdminLayout = () => {

  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  
  useEffect(() => {
    fetch("http://localhost:3200/api/v1/admin/dashboard", {
      method: "GET",
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if ( data.success ) {
          setIsAdmin(true);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (!isAdmin) return <Navigate to="/" />;


  return (
    <>
      {/* Header */}
      <AdminHeader />

      {/* Layout */}
      <div className="flex min-h-screen">
        {/* Left Sidebar */}
        <aside>
          <AdminSideBar />
        </aside>

        {/* Right Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};