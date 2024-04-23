import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Ticket() {
  const [showModal, setShowModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [userData, setUserData] = useState([]);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [formData, setFormData] = useState({
    problem: '',
    usertid: '',
    supportid: '',
    status: 'pending',
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const senddata = {
      problem: formData.problem,
      supportid: formData.supportid,
      usertid: formData.usertid,
      status: formData.status,
    };

    axios
      .put(`http://localhost:3000/tickets/${selectedTicketId}`, senddata)
      .then(() => {
        console.log("Successfully updated ticket");
        getData();
        handleClose();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const getUserData = () => {
    axios.get('http://localhost:3000/users').then((res) => {
      setUserData(res.data);
    });
  };

  const getData = () => {
    axios.get('http://localhost:3000/tickets').then((res) => {
      setTickets(res.data);
    });
  };

  const handleUpdate = (ticketId) => {
    setSelectedTicketId(ticketId);
    handleShow();
    const selectedTicket = tickets.find((ticket) => ticket.id === ticketId);
    setFormData({
      ...formData,
      problem: selectedTicket.problem,
      usertid: selectedTicket.usertid,
      supportid: selectedTicket.supportid,
      status: selectedTicket.status,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/tickets/${id}`)
      .then(() => {
        console.log("Successfully deleted ticket");
        getData();
      })
      .catch((err) => {
        alert(`Error deleting ticket: ${err}`);
      });
  };

  useEffect(() => {
    getUserData();
    getData();
  }, []);

// Modify getClientName to handle cases where userData is not yet available
const getClientName = (userId) => {
  const user = userData.find((user) => user.id === userId);
  return user ? user.name : 'Loading...';
};



  const getTechName = (techId) => {
    const tech = userData.find((tech) => tech.id === techId);
    return tech ? tech.name : 'Unknown';
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Tickets</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Action</th>
              <th>No</th>
              <th>Client</th>
              <th>Ticket</th>
              <th>Support</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index}>
                <td>
                  <button className="btn btn-danger m-1" onClick={() => handleDelete(ticket.id)}>Delete</button>
                  <button className="btn btn-success ms-1" onClick={() => handleUpdate(ticket.id)}>Edit</button>
                </td>
                <td>{index + 1}</td>
                <td>{userData.length ? getClientName(ticket.usertid) : 'Loading...'}</td>
                <td>{ticket.problem}</td>
                <td>{getTechName(ticket.supportid)}</td>
                <td>{ticket.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered" role="document">
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
                  <label htmlFor="supportid">Assign Support</label>
                  <select className='form-control' name="supportid" id="supportid" value={formData.supportid} onChange={handleChange}>
                    {userData.filter(user => user.type === 'tech').map((data) => (
                      <option key={data.id} value={data.id}>{data.name}</option>
                    ))}
                  </select>
                </div>
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
  );
}
