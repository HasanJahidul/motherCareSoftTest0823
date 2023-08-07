import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

import React from 'react'

const PrivateRoute = () => {
  return (
    <div>
                <Navbar/>
        <UserlistTable/>
        <Sidebar/>
    </div>
  )
}

export default PrivateRoute