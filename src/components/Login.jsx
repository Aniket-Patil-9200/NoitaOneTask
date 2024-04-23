import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

import { usercontext } from '../context/Userstate'

export default function Login() {
  
  let navigate = useNavigate();

  const states = useContext(usercontext)
  const data = states.data;
  const setData = states.setData;
  const formValid = states.formValid;
  const setFormValid = states.setFormValid;

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
    setFormValid(data.email !== "" && data.password !== "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/users');
      const userData = response.data.find(user =>
        user.email === data.email &&
        user.password === data.password &&
        user.type === data.type
      );
      if (userData) {
        switch (userData.type) {
          case "admin":
            navigate('/admin', { state: { userId: userData.id } });
            break;
          case "tech":
            navigate('/techdashboard', { state: { userId: userData.id } });
            break;
          case "user":
            navigate('/userdashboard', { state: { userId: userData.id } });
            break;
          default:
            console.error("Unknown user type:", userData.type);
        }
      } else {
        console.log("User not found or incorrect credentials");
        alert("Incorrect username or password.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  useEffect(() => {
  }, []);

  return (
    <section className="background-radial-gradient overflow-hidden d-flex justify-content-center align-items-center min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card bg-glass">
              <div className="card-body px-4 py-5">
                <form>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input id="email" onChange={handleChange} type="text" className="form-control" />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input id="password" onChange={handleChange} type="password" className="form-control" />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="type">Type</label>
                    <select className='form-control' name="type" id="type" onChange={handleChange}>
                      <option value="user">User</option>
                      <option value="tech">Tech</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block mb-4" disabled={!formValid}>
                    Sign In
                  </button>
                  <div className="text-center">
                    <NavLink to={'/register'}> <a>Register here</a></NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
