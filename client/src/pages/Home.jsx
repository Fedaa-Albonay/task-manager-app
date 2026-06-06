import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home-page">
        <section className="hero-section">
          <div className="hero-content">
            <span className="eyebrow">Full Stack MERN Productivity App</span>
            <h1>Task management that feels clean, fast, and professional.</h1>
            <p>A modern dashboard for creating, prioritizing, completing, and managing daily work with secure authentication and a MongoDB database.</p>
            <div className="hero-actions"><Link className="btn primary" to="/register">Start Free</Link><Link className="btn secondary" to="/login">Login</Link></div>
            <div className="tech-stack"><span>React</span><span>Node.js</span><span>Express</span><span>MongoDB</span><span>JWT</span></div>
          </div>
          <div className="hero-preview glass-panel">
            <div className="preview-header"><span></span><span></span><span></span></div>
            <div className="preview-stat"><small>Tasks Completed</small><strong>76%</strong></div>
            <div className="preview-task high"><b>Build portfolio case study</b><small>High priority</small></div>
            <div className="preview-task medium"><b>Review API routes</b><small>Medium priority</small></div>
            <div className="preview-task low"><b>Update README</b><small>Low priority</small></div>
          </div>
        </section>
        <section className="feature-grid">
          <article><h3>Secure Auth</h3><p>JWT-based registration and login with protected task routes.</p></article>
          <article><h3>Personal Dashboard</h3><p>Each user sees only their own tasks and productivity stats.</p></article>
          <article><h3>Portfolio Ready</h3><p>Clean UI, responsive layout, and a professional project structure.</p></article>
        </section>
      </main>
    </>
  );
}
