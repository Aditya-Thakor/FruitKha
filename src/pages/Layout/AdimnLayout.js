import React from 'react'
import { Outlet } from 'react-router-dom'

const AdimnLayout = () => {
  return (
    <div>
      <Sidbar/>
      <Outlet/>
    </div>
  )
}

export default AdimnLayout
