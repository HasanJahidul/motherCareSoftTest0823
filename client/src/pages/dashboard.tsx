import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import { useRouter } from "next/router";
import UserDashboard from "./user/UserDashboard";

const DashboardPage = () => {
  const router = useRouter();
  const { data } = useCurrentUser();
  const userData = {data};
  console.log(userData);
  if (userData === null) return <div>Not Authorized</div>;
  if (userData === undefined) return <div>Loading...</div>;

  if ((userData as any).user?.role === 'admin') return <AdminDashboard />;
  if ((userData as any).user?.role === 'user') return <UserDashboard />;

  router.replace("/login");

};

export default DashboardPage;
