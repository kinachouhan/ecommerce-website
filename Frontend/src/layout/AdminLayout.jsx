
import { Outlet, Navigate } from "react-router-dom";
import { AdminHeader } from "../components/AdminHeader";
import { AdminSideBar } from "../components/AdminSideBar";
import { useEffect, useState } from "react";

export const AdminLayout = () => {

  const API = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(`${API}/api/v1/admin/dashboard`, {
          method: "GET",
          credentials: "include", // send cookies
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (!res.ok) {
          // Unauthorized or forbidden
          setIsAdmin(false);
        } else if (data.success && data.admin?.role === "admin") {
          setIsAdmin(true);
        }

      } catch (err) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  if (!isAdmin) return <Navigate to="/" />;

  return (
    <>
      <AdminHeader />

      <div className="flex flex-col lg:flex-row min-h-screen">
        <aside className="h-full lg:min-h-screen border-r border-black/20">
          <AdminSideBar />
        </aside>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
          <div className="w-full lg:max-w-[1100px]">
            <Outlet />
          </div>
        </main>

      </div>
    </>
  );
}
