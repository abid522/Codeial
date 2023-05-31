const User = require('../models/user');


module.exports.profile = function (req, res) {
    return res.render('users', {
        title: 'Users'
    });
}

// Rendering the sign-up page
module.exports.signup = function (req, res) {
    return res.render('signup', {
        title: 'Sign Up'
    });
}

// Rendering the log-in page
module.exports.login = function (req, res) {
    return res.render('login', {
        title: 'Log In'
    })
}

//Signing up the user
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    const user = User.findOne({ email: req.body.email });

    user.then((data) => {
        if (data) {
            return res.redirect('back');
        }

        //If user doesn't exist, we need to create it
        const newUser = new User(req.body);

        newUser.save()
            .then((data) => {
                return res.redirect('/users/login');
            })
            .catch((err) => {
                return res.redirect('back');
            })


    }).catch((err) => {
        return;
    })
}

//Log in and creating the session for the user
module.exports.createSession = function (req, res) {

}