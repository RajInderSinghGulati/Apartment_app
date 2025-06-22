module.exports = (req, res, next) => {
  if(!req.user ){
    return res.status(403).json({error : "No User"});
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
