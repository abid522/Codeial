const express = require('express');
const port = 8000;

const app = express();

app.listen(port, (err) => {
    if (err) {
        console.error('Error', err);
        return;
    } else {
        console.log('Server is up and running at port:', port);
    }
});