import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import UserlistTable from "@/components/UserlistTable"
import PrivateRoute from "@/components/layout/private-route"
import AddUser from "../user/adduser"


const AdminDashboard = () => {
  return (
    <PrivateRoute>
      <UserlistTable />
      {/* <AddUser /> */}
    </PrivateRoute>
  )
}

export default AdminDashboard