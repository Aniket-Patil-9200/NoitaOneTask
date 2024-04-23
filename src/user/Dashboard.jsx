import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Dashboard(props) {
  const location = useLocation();
  const Navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [userData, setUserData] = useState({});
  const [ticket, setTicket] = useState({
    problem: '',
    status: 'pending',
    supportid: 0,
  });

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchData(storedUserId);
    } else if (location.state && location.state.userId) {
      setUserId(location.state.userId);
      localStorage.setItem('userId', location.state.userId);
      fetchData(location.state.userId);
    }
  }, [location.state]);

  useEffect(() => {
    // Clear user data when component mounts
    setUserData({});
  }, []);

  const fetchData = (userId) => {
    // Fetch user data
    axios.get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        console.log('User Data:', res.data);
        setUserData(res.data);
        localStorage.setItem('userData', JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });

    // Fetch tickets data using the userId passed as an argument
    axios.get(`http://localhost:3000/tickets?usertid=${userId}`)
      .then((response) => {
        setTicketData(response.data);
        localStorage.setItem('ticketData', JSON.stringify(response.data));
      })
      .catch((err) => {
        console.error('Error fetching ticket data:', err);
      });
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('ticketData');
    localStorage.removeItem('userData');
    setUserData({}); // Clear user data
    Navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const senddata = {
        problem: ticket.problem,
        status: ticket.status,
        supportid: ticket.supportid,
        usertid: userId
      };

    axios.post("http://localhost:3000/tickets", senddata)
      .then((response) => {
        console.log('Ticket Submitted:', response.data);
        handleClose();
        setTicketData(prevTickets => [...prevTickets, response.data]);
      })
      .catch((error) => {
        console.error('Error submitting ticket:', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/tickets/${id}`)
      .then(() => {
        console.log("Successfully deleted ticket");
        fetchData(userId); // Refetch data after deletion
      })
      .catch((err) => {
        console.error('Error deleting ticket:', err);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-dark justify-content-between ps-3 pe-3">
        <a className="navbar-brand"> <h3 className='ms-3 text-white'> User </h3></a>

        <div > <h3 className='text-white' > Welcome {userData.name} </h3></div>
        <form className="form-inline">
          <button className="btn btn-outline-success my-2 my-sm-0 me-5" type="submit" onClick={logout}>Logout</button>
        </form>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center mb-3">Tickets</h2>
        <button className="btn btn-primary mb-3 mt-2 mx-auto d-block" onClick={handleShow}>Add</button>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Action</th>
                <th>No</th>
                <th>Problem</th>
                <th>Status</th>
                {/* <th>Attachment</th> */}
              </tr>
            </thead>
            <tbody>
              {ticketData.map((data, i) => (
                <tr key={i}>
                  <td>
                    <button className="btn btn-danger m-1" onClick={() => handleDelete(data.id)}>Delete</button>
                    <button className="btn btn-success ms-1">Edit</button>
                  </td>
                  <td>{i + 1}</td>
                  <td>{data.problem}</td>
                  <td>{data.status}</td>
                  {/* <td>
                    {data.file ? (
                      <img src={`http://localhost:3000/${data.file}`} alt="Attachment" style={{ maxWidth: '100px' }} />
                    ) : (
                      <span>No image</span>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding ticket */}
      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Ticket</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Form for adding ticket */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="problem" className="form-label">Problem:</label>
                  <input type="text" className="form-control" name='problem' id="problem" onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status:</label>
                  <select className="form-control" name='status' id="status" onChange={handleChange} >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="file" className="form-label">Attachment:</label>
                  <input type="file" className="form-control" name='file' id="file" onChange={(e) => setTicket({...ticket, file: e.target.files[0]})} />
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
