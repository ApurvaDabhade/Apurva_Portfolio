import Project from '../models/Project.js';

export async function getProjects(req, res) {
  const projects = await Project.find({ featured: true }).sort({ order: 1 }).select('-__v');
  res.json({ success: true, data: projects });
}

export async function getProjectBySlug(req, res) {
  const project = await Project.findOne({ slug: req.params.slug }).select('-__v');
  if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
  res.json({ success: true, data: project });
}
