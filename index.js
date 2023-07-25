const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');

const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const port = 8000;

const app = express();

//For parsing the url and getting form data
app.use(express.urlencoded());

//For reading and writing into cookies
app.use(cookieParser());

//Telling express the loaction of static files
app.use(express.static(env.asset_path));

//Make the uploads folder available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

//setting up logs
app.use(logger(env.morgan.mode, env.morgan.options));

//Telling express to use express-ejs-layouts library
app.use(expressLayouts);

//Extract styles and scripts from subpages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Mongo Store is used to store the session-cookie in the database
app.use(session({
    name: 'codeial',
    //Change the secret before deployment
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100 * 60 * 1000)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1:27017/codeial_development'
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//Use express router
app.use('/', router);

app.listen(port, (err) => {
    if (err) {
        console.error('Error', err);
        return;
    } else {
        console.log('Server is up and running at port:', port);
    }
});