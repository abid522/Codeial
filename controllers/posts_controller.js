const Post = require('../models/post');

module.exports.createPost = function (req, res) {
    const newPost = new Post({
        content: req.body.content,
        user: req.user._id
    })

    newPost.save()
        .then(data => {
            console.log('Post created successfully');
            return res.redirect('/');
        })
        .catch(err => {
            console.log(err + 'Error in creating Post');
            return res.redirect('back');
        });
}
