import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <form className="auth-card glass-panel" onSubmit={submitHandler}>
          <span className="eyebrow">Create workspace</span>
          <h1>Register</h1>
          <p>Create your account and start organizing tasks in a private dashboard.</p>
          {error && <div className="form-error">{error}</div>}
          <label>Name<input placeholder="Fedaa Albonay" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></label>
          <label>Email<input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
          <label>Password<input type="password" placeholder="Minimum 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
          <button className="btn primary full">Create Account</button>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </section>
    </>
  );
}
