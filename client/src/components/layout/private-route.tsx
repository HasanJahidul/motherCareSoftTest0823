import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

import React, { ReactNode } from "react";

const PrivateRoute = ({children}: { children: ReactNode }) => {
  const { data } = useCurrentUser();
  const router = useRouter();
  if (data ===null) router.push("/login");
  return (
    <div>
      <Navbar />
      <div className="flex items-center">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%] pt-40">{children}</div>
      </div>
    </div>
  );
};

export default PrivateRoute;
