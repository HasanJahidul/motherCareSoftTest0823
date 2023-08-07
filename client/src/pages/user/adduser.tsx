import AddUserCard from "@/components/AddUserCard"
import PrivateRoute from "@/components/layout/private-route"

const AddUser = () => {
  return (
    <>
      <PrivateRoute>

      <AddUserCard />
      </PrivateRoute>
    </>
  )
}

export default AddUser