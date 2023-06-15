const express = require('express');
const router = express.Router();
const postController = require('../controllers/posts_controller');

router.post('/create-post', checkAuthentication, postController.createPost);

function checkAuthentication(req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/login');
}

module.exports = router;