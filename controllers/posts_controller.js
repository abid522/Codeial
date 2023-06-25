const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = function (req, res) {
    const newPost = new Post({
        content: req.body.content,
        user: req.user._id
    })

    newPost.save()
        .then(data => {
            console.log('Post created successfully');
            return res.redirect('back');
        })
        .catch(err => {
            console.log(err + 'Error in creating Post');
            return res.redirect('back');
        });
}

module.exports.deletePost = function (req, res) {
    Post.findById(req.params.id)
        .then(post => {
            //.id means converting the object id into string
            if (post.user == req.user.id) {
                Post.findByIdAndDelete(req.params.id)
                    .then(data => {
                        //post deleted and now its turn to delete comments
                        return Comment.deleteMany({ post: req.params.id });
                    })
                    .then(comment => {
                        return res.redirect('back');
                    })
                    .catch(err => {
                        return console.log(err + 'Error deleting the post');
                    });
            }
        })
        .catch(err => {
            console.log(err + 'Error finding the post');
            return res.redirect('back');
        });
}