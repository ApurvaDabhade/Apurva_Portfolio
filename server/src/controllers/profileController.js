import Profile from '../models/Profile.js';

export async function getProfile(req, res) {
  const profile = await Profile.findOne().select('-__v');
  if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });
  res.json({ success: true, data: profile });
}
