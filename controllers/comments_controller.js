const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.createComment = function (req, res) {
    Post.findById(req.body.post)
        .then(post => {
            //post mil gya then comment create krna h
            new Comment({
                content: req.body.comment,
                user: req.user._id,
                post: req.body.post
            }).save()
                .then(comment => {
                    post.comments.push(comment);
                    post.save();
                    return res.redirect('back');
                })
                .catch(err => {
                    console.log(err + 'Error adding comment');
                    return res.redirect('back');
                })
        })
        .catch(err => {
            console.log(err + 'Error finding Post');
            return res.redirect('back');
        })
}