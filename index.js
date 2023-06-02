const express = require('express');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const port = 8000;

const app = express();

//For parsing the url and getting form data
app.use(express.urlencoded());

//For reading and writing into cookies
app.use(cookieParser());

//Telling express the loaction of static files
app.use(express.static('./assets'));

//Telling express to use express-ejs-layouts library
app.use(expressLayouts);

//Extract styles and scripts from subpages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codeial',
    //Change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100 * 60 * 1000)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

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