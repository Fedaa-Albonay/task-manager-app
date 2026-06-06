import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const initialForm = { title: '', description: '', priority: 'medium', dueDate: '' };

export default function Dashboard() {
  const { user, API_URL, authHeader } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/tasks`, authHeader());
      setTasks(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const stats = useMemo(() => {
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    const high = tasks.filter(task => task.priority === 'high').length;
    const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
    return { total: tasks.length, completed, pending, high, progress };
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    if (filter === 'high') return tasks.filter(task => task.priority === 'high');
    return tasks.filter(task => task.status === filter);
  }, [tasks, filter]);

  const submitTask = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_URL}/tasks/${editingId}`, form, authHeader());
      } else {
        await axios.post(`${API_URL}/tasks`, form, authHeader());
      }
      setForm(initialForm);
      setEditingId(null);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Task could not be saved.');
    }
  };

  const toggleStatus = async (task) => {
    await axios.put(`${API_URL}/tasks/${task._id}`, {
      status: task.status === 'completed' ? 'pending' : 'completed'
    }, authHeader());
    fetchTasks();
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/tasks/${id}`, authHeader());
    fetchTasks();
  };

  return (
    <>
      <Navbar />
      <main className="dashboard-shell">
        <section className="dashboard-hero">
          <div>
            <span className="eyebrow">Productivity Dashboard</span>
            <h1>Welcome back, {user?.name || 'Creator'}.</h1>
            <p>Plan your work, track priorities, and keep every task connected to your personal account.</p>
          </div>
          <div className="progress-card">
            <span>Completion</span>
            <strong>{stats.progress}%</strong>
            <div className="progress-track"><div style={{ width: `${stats.progress}%` }} /></div>
          </div>
        </section>

        <section className="stats-grid">
          <article><span>Total Tasks</span><strong>{stats.total}</strong></article>
          <article><span>Pending</span><strong>{stats.pending}</strong></article>
          <article><span>Completed</span><strong>{stats.completed}</strong></article>
          <article><span>High Priority</span><strong>{stats.high}</strong></article>
        </section>

        <section className="workspace-grid">
          <form className="glass-panel task-form" onSubmit={submitTask}>
            <div className="section-heading">
              <span>{editingId ? 'Update selected task' : 'Create task'}</span>
              <h2>{editingId ? 'Edit Task' : 'Add New Task'}</h2>
            </div>
            {error && <p className="form-error">{error}</p>}
            <label>Title<input placeholder="Design portfolio section" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></label>
            <label>Description<textarea placeholder="Write details, notes, or acceptance criteria..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea></label>
            <div className="form-row">
              <label>Priority<select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></label>
              <label>Due Date<input type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} /></label>
            </div>
            <button className="btn primary full">{editingId ? 'Save Changes' : 'Add Task'}</button>
            {editingId && <button type="button" className="btn ghost full" onClick={() => { setEditingId(null); setForm(initialForm); }}>Cancel Edit</button>}
          </form>

          <div className="tasks-panel">
            <div className="tasks-toolbar">
              <div className="section-heading"><span>Task board</span><h2>Your Tasks</h2></div>
              <div className="filters">
                {['all', 'pending', 'completed', 'high'].map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}
              </div>
            </div>

            {loading && <div className="empty-state">Loading tasks...</div>}
            {!loading && filteredTasks.length === 0 && <div className="empty-state">No tasks found. Create your first task or change the filter.</div>}

            <div className="tasks-list">
              {filteredTasks.map(task => (
                <article className={`task-card ${task.status}`} key={task._id}>
                  <div className="task-main">
                    <div className="task-meta"><span className={`priority ${task.priority}`}>{task.priority}</span><span>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</span></div>
                    <h3>{task.title}</h3>
                    <p>{task.description || 'No description added.'}</p>
                  </div>
                  <div className="task-actions">
                    <button onClick={() => toggleStatus(task)}>{task.status === 'completed' ? 'Reopen' : 'Complete'}</button>
                    <button onClick={() => editTask(task)}>Edit</button>
                    <button onClick={() => deleteTask(task._id)} className="danger">Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
