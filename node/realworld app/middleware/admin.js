function admin(req, res, next) {
    if (req.user.level === 1||2) return res.status(403).send('Access denied.');
    next();
}

module.exports = admin