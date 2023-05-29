const express = require('express');
const router = require('./routes/index');
const port = 8000;

const app = express();

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