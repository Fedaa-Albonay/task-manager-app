const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  if (!title) return res.status(400).json({ message: 'Task title is required' });

  const task = await Task.create({ user: req.user._id, title, description, priority, dueDate: dueDate || null });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  task.status = req.body.status ?? task.status;
  task.priority = req.body.priority ?? task.priority;
  task.dueDate = req.body.dueDate === '' ? null : (req.body.dueDate ?? task.dueDate);
  await task.save();

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json({ message: 'Task deleted successfully' });
};
