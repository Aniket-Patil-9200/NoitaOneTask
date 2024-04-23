import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Register() {
  let navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "user"
  });

  function handleChange(e) {
    e.preventDefault();
    setData({ ...data, [e.target.id]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/users', data)
      .then((res) => {
        console.log(res.data);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="background-radial-gradient overflow-hidden">
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="col-lg-6 col-md-8">
            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="name">User name</label>
                    <input id="name" onChange={(e) => handleChange(e)} type="text" className="form-control" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input id="email" onChange={(e) => handleChange(e)} type="email" className="form-control" />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input id="password" onChange={(e) => handleChange(e)} type="password" className="form-control" />
                  </div>

                  <button type="submit" onClick={(e) => handleSubmit(e)} className="btn btn-primary btn-block mb-4">
                    Register Now
                  </button>

                  <div className="text-center">
                    <NavLink to={"/"}> <a>Sign in</a></NavLink>
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
