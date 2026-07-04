import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Project from '../models/Project.js';
import Profile from '../models/Profile.js';

const projects = [
  {
    title: 'MentalBridge — Digital Mental Health Platform',
    slug: 'mentalbridge',
    category: 'AI · Healthcare · RAG · Generative AI',
    description:
      'Designed and developed a scalable cross-platform mental health platform using a three-tier architecture (client, server, and database). Built a student-facing application featuring chatbot-based assessments and interactive dashboards.',
    highlights: [
      'Implemented Retrieval-Augmented Generation (RAG) using embeddings and Pinecone vector search for context-aware responses',
      'Developed institute-level dashboards and counsellor interfaces with automated scoring and reporting workflows',
      'Integrated Power BI dashboards for monitoring trends, analytics, and actionable insights',
    ],
    tags: ['React', 'MongoDB', 'REST APIs', 'RAG', 'Pinecone', 'OpenAI APIs', 'Power BI'],
    githubUrl: 'https://github.com/ApurvaDabhade/Mental_Health_Student',
    accent: 'blue',
    icon: '🧠',
    order: 1,
    meta: [
      { label: 'Three-tier architecture', color: 'blue' },
      { label: 'RAG + Power BI', color: 'purple' },
      { label: 'Student-facing', color: 'green' },
    ],
  },
  {
    title: 'Smart Krishi Advisor — Agricultural Intelligence Platform',
    slug: 'smart-krishi-advisor',
    category: 'ML · NLP · Generative AI · Agriculture',
    description:
      'Developed an ML and LLM-based agricultural intelligence system for crop recommendation and pest detection. Built a multilingual conversational AI solution with SMS-based deployment support.',
    highlights: [
      'Designed Flask-MongoDB backend services for real-time processing and prediction workflows',
      'Applied data preprocessing, feature engineering, EDA, and model evaluation to improve prediction accuracy',
    ],
    tags: ['Python', 'Flask', 'MongoDB', 'OpenAI APIs', 'LLMs', 'NLP', 'EDA', 'SMS APIs'],
    githubUrl: 'https://github.com/ApurvaDabhade/Smart-Krishi-Advisor',
    accent: 'green',
    icon: '🌾',
    order: 2,
    meta: [
      { label: 'Multilingual AI', color: 'green' },
      { label: 'SMS deployment', color: 'blue' },
    ],
  },
  {
    title: 'Rasoimitra — Decision Support Platform for Food Businesses',
    slug: 'rasoimitra',
    category: 'LLM · Business Intelligence · Agentic AI',
    description:
      'Engineered an AI-powered platform for pricing optimization, menu planning, and inventory management using LLMs and machine learning. Designed scalable REST APIs and automated data pipelines using web scraping, external APIs, and n8n workflows.',
    highlights: [
      'Built analytics dashboards for demand forecasting and pricing insights',
      'Integrated LLM-based recommendations, ML forecasting, and real-time Twilio alerts to improve operational efficiency',
      'Automated data pipelines via web scraping, external APIs, and n8n workflows replacing manual processes',
    ],
    tags: ['REST APIs', 'n8n', 'LangChain', 'LLMs', 'Machine Learning', 'Web Scraping', 'Twilio APIs'],
    githubUrl: 'https://github.com/ApurvaDabhade/AI_Radar_Vendors',
    accent: 'purple',
    icon: '🍽',
    order: 3,
    meta: [
      { label: 'LLM + LangChain', color: 'purple' },
      { label: 'n8n automation', color: 'amber' },
      { label: 'Twilio alerts', color: 'rose' },
    ],
  },
  {
    title: '12-Channel Industrial SPC Gauging System',
    slug: 'industrial-spc',
    category: 'Industrial · Embedded · SPC · Raspberry Pi',
    description:
      'Designed and implemented a 12-channel industrial gauging and Statistical Process Control (SPC) system using Raspberry Pi for automotive engine component quality assurance at Vision Gauges & Services.',
    highlights: [
      'Multi-channel ADC with signal conditioning — pressure, displacement, voltage, and force sensors',
      'Real-time pass/fail logic, SPC analytics, and QR-based part traceability',
      'Industrial protection circuits, relay drivers, and 24×7 shop-floor operation support',
    ],
    tags: ['Raspberry Pi', 'Python', 'SPC', 'ADC', 'Signal Conditioning', 'SQLite', 'Tkinter', 'QR Traceability'],
    accent: 'amber',
    icon: '⚙',
    order: 4,
    meta: [
      { label: '12 Channels', color: 'amber' },
      { label: '24×7 Operation', color: 'amber' },
      { label: 'SPC Analytics', color: 'amber' },
    ],
  },
  {
    title: 'CodSoft — UI/UX Design Portfolio',
    slug: 'codsoft-ux',
    category: 'UI/UX · Figma · Web Design · Internship',
    description:
      'UI/UX Design Intern at CodSoft — designed 5+ responsive web interfaces with a focus on usability, visual hierarchy, and accessible user flows. Portfolio includes high-fidelity Figma designs published on GitHub.',
    highlights: [
      'E-commerce site — product listing, cart flow, and checkout UI with responsive layouts',
      'Restaurant menu design — typography-led layout with clear category hierarchy and pricing',
      'Sign-up flow — multi-step registration with form validation UX and error state design',
    ],
    tags: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'UI Design', 'UX Research', 'Responsive Design'],
    githubUrl: 'https://github.com/ApurvaDabhade/CodSoft',
    accent: 'rose',
    icon: '🎨',
    order: 5,
    meta: [
      { label: '5+ interfaces', color: 'rose' },
      { label: 'CodSoft Intern', color: 'purple' },
      { label: 'PDF case studies', color: 'blue' },
    ],
  },
  {
    title: 'GeeksforGeeks — Website Design Projects',
    slug: 'gfg-design',
    category: 'UI/UX · Web Design · Team Collaboration',
    description:
      'Associate Designer Team Member at GeeksforGeeks — contributed to website design projects as part of a collaborative design team, creating responsive layouts and UI components aligned with brand guidelines.',
    highlights: [
      'Collaborated with the design team on responsive website layouts for GFG web properties',
      'Designed UI sections and components consistent with GeeksforGeeks brand identity',
      'Participated in design reviews, iteration cycles, and handoff documentation for development',
    ],
    tags: ['Figma', 'Web Design', 'UI/UX', 'Responsive Design', 'Design Systems', 'Team Collaboration'],
    accent: 'purple',
    icon: '🌐',
    order: 6,
    badge: '✦ GFG · Associate Designer Team Member',
    meta: [
      { label: 'GFG Design Team', color: 'purple' },
      { label: 'Website layouts', color: 'blue' },
      { label: 'Brand-aligned UI', color: 'green' },
    ],
  },
];

const profile = {
  name: 'Apurva Dabhade',
  tagline: 'Backend Developer · Full-Stack · UI/UX · Agentic AI',
  roles: ['Backend Developer', 'Full-Stack', 'UI/UX Designer', 'Agentic AI', 'Generative AI'],
  bio: [
    'Final-year student in Electronics & Telecommunication at VIIT Pune (Graduating 2027). I build full-stack applications and AI-integrated systems across web, backend, and AI domains.',
    'Participated in 10+ hackathons including SIH and multiple national-level competitions. I enjoy building scalable backend systems, intuitive interfaces, and AI-powered workflows that solve real problems.',
  ],
  email: 'apurvadabhade13@gmail.com',
  phone: '+91 77091 07717',
  linkedin: 'https://linkedin.com/in/apurva-dabhade',
  github: 'https://github.com/ApurvaDabhade',
  leetcode: 'https://leetcode.com/u/apurvadabhade27',
  cgpa: 8.99,
  graduationYear: 2027,
  university: 'Vishwakarma Institute of Information Technology, Pune',
  branch: 'E&TC',
  availability: 'Open to Internships',
  stats: { projects: '6+', cgpa: '8.99', hackathons: '10+' },
  skills: {
    languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express.js', 'Flask', 'HTML5', 'CSS3'],
    aiMl: ['OpenAI', 'LangChain', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch', 'Power BI', 'Pinecone', 'HuggingFace'],
    databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Docker', 'Git', 'GitHub', 'Postman', 'Figma', 'Twilio', 'n8n'],
    design: ['Figma', 'Adobe XD', 'Tailwind CSS', 'Framer', 'Wireframing', 'Prototyping', 'Design Systems', 'User Research', 'Storybook'],
  },
  achievements: [
    {
      title: '1st Runner-Up',
      event: 'AgriAI Hackathon 2025 — VIT Pune',
      detail: '150+ participants. Built an AI-powered agricultural advisory platform under competition conditions.',
      medal: '🥈',
      accent: 'blue',
      meta: [{ label: 'VIT Pune · 2025', color: 'blue' }, { label: 'AgriAI Track', color: 'green' }],
    },
    {
      title: 'Best Idea Award',
      event: 'SciTech Innovation Hackathon',
      detail: 'Finalist among 250+ teams. Recognized for innovation and technical execution depth.',
      medal: '💡',
      accent: 'amber',
      meta: [{ label: '250+ teams', color: 'amber' }, { label: 'Best Idea', color: 'rose' }],
    },
    {
      title: '2nd Place',
      event: 'SIH Internal Hackathon 2025',
      detail: 'Institute-level selection for Smart India Hackathon 2025.',
      medal: '🥉',
      accent: 'green',
      meta: [{ label: 'SIH 2025', color: 'green' }, { label: 'Institute Select', color: 'blue' }],
    },
    {
      title: 'UI/UX Design Intern',
      event: 'CodSoft',
      detail: 'Designed 5+ responsive interfaces. Enhanced usability and accessibility across web applications.',
      medal: '🎨',
      accent: 'purple',
      meta: [{ label: '5+ interfaces', color: 'purple' }, { label: 'Figma · UX', color: 'blue' }],
    },
  ],
  education: [
    {
      degree: 'B.Tech — Electronics & Telecommunication',
      school: 'Vishwakarma Institute of Information Technology, Pune',
      period: 'Jun 2023 – Jun 2027',
      grade: '8.99 / 10',
      gradeType: 'cgpa',
    },
    {
      degree: 'HSC — Maharashtra State Board',
      school: 'May 2023',
      period: '',
      grade: '83.17%',
      gradeType: 'percent',
    },
    {
      degree: 'SSC — Maharashtra State Board',
      school: 'Jun 2021',
      period: '',
      grade: '97%',
      gradeType: 'percent',
    },
  ],
};

async function seed() {
  await connectDB();
  await Project.deleteMany({});
  await Profile.deleteMany({});
  await Project.insertMany(projects);
  await Profile.create(profile);
  console.log('Database seeded successfully');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
