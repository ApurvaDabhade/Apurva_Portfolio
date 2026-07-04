import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: String,
    tagline: String,
    roles: [String],
    bio: [String],
    email: String,
    phone: String,
    linkedin: String,
    github: String,
    leetcode: String,
    cgpa: Number,
    graduationYear: Number,
    university: String,
    branch: String,
    availability: String,
    stats: {
      projects: String,
      cgpa: String,
      hackathons: String,
    },
    skills: {
      languages: [String],
      aiMl: [String],
      databases: [String],
      design: [String],
    },
    achievements: [
      {
        title: String,
        event: String,
        detail: String,
        medal: String,
        accent: String,
        meta: [{ label: String, color: String }],
      },
    ],
    education: [
      {
        degree: String,
        school: String,
        period: String,
        grade: String,
        gradeType: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
