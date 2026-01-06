
import { Outlet, Navigate } from "react-router-dom";
import { AdminHeader } from "../components/AdminHeader";
import { AdminSideBar } from "../components/AdminSideBar";
import { useEffect, useState } from "react";

export const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("http://localhost:3200/api/v1/admin/dashboard", {
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
      <div className="flex min-h-screen">
        <aside>
          <AdminSideBar />
        </aside>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
}
