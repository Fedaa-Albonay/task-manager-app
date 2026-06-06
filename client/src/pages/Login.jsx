import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <form className="auth-card glass-panel" onSubmit={submitHandler}>
          <span className="eyebrow">Welcome back</span>
          <h1>Login</h1>
          <p>Access your secure dashboard and continue managing your tasks.</p>
          {error && <div className="form-error">{error}</div>}
          <label>Email<input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></label>
          <label>Password<input type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required /></label>
          <button className="btn primary full">Login</button>
          <p>New here? <Link to="/register">Create an account</Link></p>
        </form>
      </section>
    </>
  );
}
