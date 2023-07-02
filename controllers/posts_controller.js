const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.createPost = function (req, res) {
    const newPost = new Post({
        content: req.body.content,
        user: req.user._id
    })

    newPost.save()
        .then(data => {
            req.flash('success', 'Post created Successfully!');
            return res.redirect('back');
        })
        .catch(err => {
            req.flash('error', 'Error creating post!');
            return res.redirect('back');
        });
}

// module.exports.deletePost = function (req, res) {
//     Post.findById(req.params.id)
//         .then(post => {
//             //.id means converting the object id into string
//             if (post.user == req.user.id) {
//                 Post.findByIdAndDelete(req.params.id)
//                     .then(data => {
//                         //post deleted and now its turn to delete comments
//                         return Comment.deleteMany({ post: req.params.id });
//                     })
//                     .then(comment => {
//                         return res.redirect('back');
//                     })
//                     .catch(err => {
//                         return console.log(err + 'Error deleting the post');
//                     });
//             }
//         })
//         .catch(err => {
//             console.log(err + 'Error finding the post');
//             return res.redirect('back');
//         });
// }

module.exports.deletePost = async function (req, res) {
    try {
        const post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            await Post.findByIdAndDelete(req.params.id);
            await Comment.deleteMany({ post: req.params.id });
            req.flash('success', 'Post deleted Successfully!');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', 'Error deleting post!');
        return res.redirect('back');
    }
}