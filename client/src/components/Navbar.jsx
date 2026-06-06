import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <header className="navbar">
      <Link className="brand" to="/"><span>TM</span>TaskFlow</Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        {user && <NavLink to="/dashboard">Dashboard</NavLink>}
      </nav>
      <div className="nav-actions">
        {user ? <button className="btn small ghost" onClick={handleLogout}>Logout</button> : <><Link className="btn small ghost" to="/login">Login</Link><Link className="btn small primary" to="/register">Register</Link></>}
      </div>
    </header>
  );
}
