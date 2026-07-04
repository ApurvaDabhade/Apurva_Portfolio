export function requireAdminKey(req, res, next) {
  const key = process.env.ADMIN_API_KEY;
  if (!key) {
    return res.status(503).json({ success: false, message: 'Admin API not configured' });
  }
  const provided = req.headers['x-api-key'];
  if (provided !== key) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  next();
}
