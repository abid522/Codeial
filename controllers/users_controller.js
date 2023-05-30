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

//Get the sign-up data
module.exports.create = function (req, res) {

}

//Log in and creating the session for the user
module.exports.createSession = function (req, res) {

}