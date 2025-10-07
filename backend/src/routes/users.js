const router = require('express').Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/', auth, async (_req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ name: 1 });
    res.json(users);
  } catch (err) { next(err); }
});

module.exports = router;


