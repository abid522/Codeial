const User = require('../models/user');
const Post = require('../models/post');

module.exports.profile = function (req, res) {
    User.findById(req.params.id)
        .then((user) => {
            const posts = Post.find({ user: req.params.id });

            posts
                .populate('user')
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'user'
                    }
                })
                .then(posts => {
                    return res.render('profile', {
                        title: user.name,
                        profile_user: user,
                        posts: posts
                    });
                }).catch(err => {
                    console.log(err + 'Error fetching posts');
                })
        })
        .catch(err => {
            console.log(err + 'Error fiinding user');
            return res.redirect('back');
        })
}

module.exports.updateProfile = function (req, res) {
    if (req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.params.id, req.body)
            .then(data => {
                return res.redirect('back');
            })
            .catch(err => {
                console.log(err + 'Error updating profile!');
                return res.redirect('back');
            })
    } else {
        return res.status(401).send('Unauthorized Access!!');
    }
}

// Rendering the sign-up page
module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signup', {
        title: 'Sign Up'
    });
}

// Rendering the log-in page
module.exports.login = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
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
    return res.redirect('/');
}

//signout
module.exports.signout = function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        return res.redirect('/');
    });
}