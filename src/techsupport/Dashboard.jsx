import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const location = useLocation();
  const Navigate = useNavigate()

  const [showModal, setShowModal] = useState(false);
  const [getticket, setticket] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  // const [userId, setUserId] = useState(null); 
  const [userdata, setuserdata] = useState([]);

  const [formData, setFormData] = useState({
    problem: '',
    usertid: '',
    supportid: '',
    status: 'pending',
  });
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


  const userId = location.state && location.state.userId;
  console.log(userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const senddata = {
      problem: formData.problem,
      supportid: formData.supportid,
      usertid: formData.usertid,
      status: formData.status
    }
    console.log(senddata);

    axios.put(`http://localhost:3000/tickets/${selectedTicketId}`, senddata)
      .then(() => {
        console.log("Successfully updated ticket");
        getdata();
        handleClose();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getdata = () => {
    axios.get('http://localhost:3000/tickets')
      .then((response) => {
        // Filter tickets based on supportid matching userId
        const filteredTickets = response.data.filter(ticket => ticket.supportid === userId);
        setticket(filteredTickets);
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  };


  const handleDelete = () => {

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (ticketId) => {
    setSelectedTicketId(ticketId);
    handleShow();
    const selectedTicket = getticket.find(ticket => ticket.id === ticketId);
    setFormData({
      ...formData,
      problem: selectedTicket.problem,
      usertid: selectedTicket.usertid,
      supportid: selectedTicket.supportid,
      status: selectedTicket.status,
    });
  };

  const logout = () => {
    Navigate('/')
  }

  useEffect(() => {
    getdata()
  }, [])

  return (
    <div>
      <nav className="navbar navbar-light bg-dark justify-content-between ps-5 pe-5">
        <a className="navbar-brand text-white">Tech support</a>
        <form className="form-inline">
          <button className="btn btn-outline-success my-2 my-sm-0 me-5" type="submit" onClick={logout}>Logout</button>
        </form>
      </nav>
      
      <div className="container mt-5">
        <h2>Tickets</h2>
        <div className="card">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Action</th>
                <th>No</th>
                <th>Ticket</th>
                <th>Problem</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {getticket.map((ticket, index) => (
                <tr key={index}>
                  <td>
                    <button className="btn btn-danger m-1" onClick={() => handleDelete(ticket.id)}>Delete</button>
                    <button className="btn btn-success ms-1" onClick={() => handleUpdate(ticket.id)}>Edit</button>
                  </td>
                  <td>{index + 1}</td>
                  <td>{ticket.id}</td>
                  <td>{ticket.problem}</td>
                  <td>{ticket.status}</td>
                </tr>
              ))}
              <tr>
                <td></td>
              </tr>

            </tbody>
          </table>
        </div>
        {/* <!-- Modal --> */}
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Ticket</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select className='form-control' name="status" id="status" value={formData.status} onChange={handleChange}>
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
