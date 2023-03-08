import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

const DashboardLayout = () => {
  return (
    <div style={{display: 'flex'}}>
    <Sidebar/>
    <Outlet/>
    </div>
  )
}

export default DashboardLayout