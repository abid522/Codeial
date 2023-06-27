const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 28);
    Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        .then(posts => {
            User.find({})
                .then(users => {
                    return res.render('home', {
                        title: 'Codeial | Home',
                        posts: posts,
                        users: users
                    });
                })
                .catch(err => {
                    console.log(err + 'Error fetching users');
                })
        })
        .catch(err => {
            console.log(err + 'Error fetching posts');
        });
}