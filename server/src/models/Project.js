import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: String,
    description: String,
    highlights: [String],
    tags: [String],
    githubUrl: String,
    liveUrl: String,
    accent: { type: String, enum: ['blue', 'green', 'purple', 'amber', 'rose'], default: 'blue' },
    icon: String,
    badge: String,
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
    meta: [{ label: String, color: String }],
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
