import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../src/App.css"

function Sidebar() {
  function closebutton() {
    var element = document.getElementById("side_nav");
    element.classList.remove("active");
  }
  return (
    <div>
      <div className="sidebar" id="side_nav">
        <div className="header-box  pt-3 pb-4 justify-content-between d-flex ">
          <h6 className="fs-4 ms-5 "> <span className="fs-2 text-white rounded shadow  me-3 pb-2">Admin</span></h6>
          <button className=" btn d-md-none d-block close-btn px-1 py-0 text-white" onClick={closebutton}><i
            className="fas fa-stream"></i></button>
        </div>
        <ul className="list-unstyled px-5 ">
          <li className='nav-bar-link pt-2'><NavLink to={'/admin'} className=" text-decoration-none d-block px-3 py-2" ><i
            className="fa-solid fa-house"></i>TechSupport</NavLink ></li>
          
          <li className='nav-bar-link pt  -2'><NavLink to={'/admin/ticket'} className="text-decoration-none d-block px-3 py-2"  ><i
            className="fa-solid fa-house"></i>Tickets</NavLink ></li>


          <li className='nav-bar-link pt  -2'><NavLink to={'/admin/users'} className="text-decoration-none d-block px-3 py-2"  ><i
            className="fa-solid fa-house"></i>Users</NavLink ></li>



        </ul>
        <hr className="h-color mx-2" />
      </div>
    </div>
  )
}

export default Sidebar