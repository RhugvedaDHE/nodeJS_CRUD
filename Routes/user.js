const express = require('express');
const router = express.Router();
const User = require('../Controllers/User');

router.route('/').get(User.index);

router.put('/update', User.update);

module.exports = router;