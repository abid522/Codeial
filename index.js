const express = require('express');
const router = require('./routes/index');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;

const app = express();

//Telling express the loaction of static files
app.use(express.static('./assets'));

//Telling express to use express-ejs-layouts library
app.use(expressLayouts);

//Extract styles and scripts from subpages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Use express router
app.use('/', router);

//setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err) => {
    if (err) {
        console.error('Error', err);
        return;
    } else {
        console.log('Server is up and running at port:', port);
    }
});