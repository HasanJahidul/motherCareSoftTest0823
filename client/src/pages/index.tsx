import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UserlistTable from "@/components/UserlistTable";
import AddUser from "@/components/AddUser";

export default function Home() {
  return (
    <div className='flex h-full flex-col justify-center'>
      {/* <Navbar /> */}
      {/* <Sidebar /> */}
      {/* <UserlistTable /> */}
      <AddUser />
    </div>
  );
}