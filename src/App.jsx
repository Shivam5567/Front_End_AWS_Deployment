import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { addUser, listUsers } from './api';

// --- COMPONENT 1: Registration Page ---
const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: '', email: '', username: '', password: '', phone: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser(formData);
      alert("Signup Successful!");
      navigate('/users'); 
    } catch (error) {
      alert("Signup failed. Check backend.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 className="text-center text-primary mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter your Name" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter your email address" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Username</label>
              <input type="text" className="form-control" placeholder="Create Username" 
                onChange={(e) => setFormData({...formData, username: e.target.value})} required />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Phone</label>
              <input type="text" className="form-control" placeholder="1234567890" 
                onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
            </div>
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input type="password" className="form-control" placeholder="••••••••" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          
          {/* Main Action: Sign Up */}
          <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mb-3">
            Sign Up
          </button>

          {/* Secondary Action: View User List */}
          <div className="text-center border-top pt-3">
            <p className="small text-muted mb-2">Already have entries in the database?</p>
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm w-100" 
              onClick={() => navigate('/users')}
            >
              View Registered Users List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- COMPONENT 2: Data Display Page ---
const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await listUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to load users", error);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center p-3">
          <h4 className="mb-0">Registered Users</h4>
          <button className="btn btn-light btn-sm fw-bold shadow-sm" onClick={() => navigate('/')}>
            + New Signup
          </button>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th className="px-4">ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((u) => (
                    <tr key={u.id}>
                      <td className="px-4 text-muted small">{u.id.substring(0, 8)}...</td>
                      <td className="fw-bold text-dark">{u.name}</td>
                      <td>{u.email}</td>
                      <td><span className="badge bg-secondary">@{u.username}</span></td>
                      <td>{u.phone}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-5">
                      <div className="text-muted">No users registered yet.</div>
                      <button className="btn btn-link btn-sm mt-2" onClick={() => navigate('/')}>
                        Click here to add the first user
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/users" element={<UserList />} />
    </Routes>
  );
}

export default App;