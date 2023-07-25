const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname, '/../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'abid1600251@gmail.com',
            pass: 'ssztvtakbpldirvj' //this code was copied from google account.
        }
    },
    morgan: {
        mode: 'dev',
        options: {
            stream: accessLogStream
        }
    }
}

const production = {
    name: process.env.CODEIAL_ENVIRONMENT,
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_USERNAME,
            pass: process.env.CODEIAL_PASSWORD_SECRET //this code was copied from google account.
        }
    },
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogStream
        }
    }
}

module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? developmmentk : eval(process.env.CODEIAL_ENVIRONMENT)