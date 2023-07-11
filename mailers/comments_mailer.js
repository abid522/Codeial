const nodeMailer = require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside new comment mailer');
    nodeMailer.renderTemplate({ comment: comment }, '/comments/new_comment.ejs')
        .then(data => {
            return nodeMailer.transporter.sendMail({
                from: 'abid1600251@gmail.com',
                to: comment.user.email,
                subject: 'New comment published',
                html: data
            })
        })
        .then(data => {
            console.log('Message sent', data);
            return;
        })
        .catch(err => {
            console.log('Error sending mail', err);
            return;
        })
}