import React from 'react'
import { Offline } from 'react-detect-offline'
import { Outlet } from 'react-router-dom'

import Navbar from '../Navbar/Navbar'


export default function Layout() {
  return (
    <>
  <Navbar/>
    <div >
      <Offline>Only shown offline (surprise!)</Offline>
      
      
    
      <Outlet></Outlet>
   </div>
 

   
  </>
  )
}
