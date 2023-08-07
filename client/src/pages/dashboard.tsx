import useCurrentUser from "@/hooks/useCurrentUser";
import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import { useRouter } from "next/router";
import UserDashboard from "./user/UserDashboard";
import { IUser } from "@/User.interface";

const DashboardPage = () => {
  const router = useRouter();
  const { data } = useCurrentUser();
  const user = {data};
  const userData = (user.data as IUser);
  if (userData === null) return <div>Not Authorized</div>;
  if (userData === undefined) return <div>Loading...</div>;

  if (userData.role === 'admin') return <AdminDashboard />;
  if (userData.role === 'user') return <UserDashboard />;

  router.replace("/login");

};

export default DashboardPage;
