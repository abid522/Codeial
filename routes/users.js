const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile/:id', checkAuthentication, usersController.profile);
router.post('/update-profile/:id', checkAuthentication, usersController.updateProfile);
router.get('/signup', usersController.signup);
router.get('/login', usersController.login);
router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session',
    passport.authenticate('local', { failureRedirect: '/users/login' }),
    usersController.createSession
);

router.get('/signout', usersController.signout);

function checkAuthentication(req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/login');
}

module.exports = router;