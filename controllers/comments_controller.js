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

module.exports.deleteComment = function (req, res) {
    Comment.findById(req.params.id)
        .then(comment => {
            if (comment.user == req.user.id) {
                //authorized to delete the comment
                let postId = comment.post;
                Comment.findByIdAndDelete(comment.id)
                    .then(data => {
                        return Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
                    })
                    .then(result => {
                        return res.redirect('back');
                    })
                    .catch(err => {
                        console.log(err + 'Error deleting the comment');
                        return res.redirect('back');
                    })
            }
        })
        .catch(err => {
            console.log(err + 'Error finding the comment');
            return res.redirect('back');
        });
}