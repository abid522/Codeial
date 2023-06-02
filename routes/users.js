const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile', usersController.profile);
router.get('/signup', usersController.signup);
router.get('/login', usersController.login);
router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    usersController.createSession
);

module.exports = router;