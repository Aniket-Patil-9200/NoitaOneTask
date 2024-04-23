import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
function Layout() {
const navigate = useNavigate();

// useEffect(()=>{
//   // const data ={email,};
//   const data = localStorage.getItem("data");


//   if(!data){
//     navigate("/login");
//   }
// },[])

  return (
    <div className="main-container d-flex">
        <Sidebar />
        <div className="content">
          <Header/>
          <Outlet />
        </div>
      </div>
  )
}

export default Layout