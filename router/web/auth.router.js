const express = require('express');
const { register, login } = require('../../controllers/auth.controllers');
const passport = require('../../middleware/passport');

const router = express.Router();

router.post('/register',passport.authenticate('signup', { failureRedirect: '/fail-register' }), register);
router.post('/login',passport.authenticate('signin', { failureRedirect: '/fail-login' }), login);

module.exports = router;