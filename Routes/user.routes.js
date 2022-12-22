const express = require('express');
const router = express.Router();
const User = require('../Controllers/user.controller');
const verifyRoles = require('../Middlewares/verifyRoles');
const ROLES =  require('../Config/roles.config');

router.get('/', verifyRoles(ROLES.Guest, ROLES.User), User.index);

router.put('/update',verifyRoles(ROLES.User), User.update);

module.exports = router;