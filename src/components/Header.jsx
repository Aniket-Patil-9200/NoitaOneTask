import React from 'react';
import '../../src/App.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); // Get access to the navigate function

  function openButton() {
    var element = document.getElementById("side_nav");
    element.classList.add("active");
  }

  const handleLogout = () => {
    // Perform any logout related operations, e.g., clearing session, removing tokens, etc.
    // For now, let's just redirect to the login page
    navigate('/'); // Redirect to login page using the navigate function
  };

  return (
    <div>
      <button className="btn d-md-none d-block open-btn px-1 py-0" onClick={openButton}><i className="fas fa-stream"></i></button>
      <div>
        <nav className="navbar navbar-light bg-dark mt-1">
          <a className="navbar-brand" href="#">
            <img src="/docs/4.0/assets/brand/bootstrap-solid.svg" width="30" height="30" alt=""/>
          </a>
          {/* Logout Button */}
          <button className="btn btn-danger mb-3 mt-2 d-block mx-auton me-5" onClick={handleLogout}>Logout</button>
        </nav>
      </div>
    </div>
  );
}

export default Header;
