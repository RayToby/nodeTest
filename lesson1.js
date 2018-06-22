const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello world');

   console.log(res.toString());
});

app.listen(3000, () => {
    console.log('aaaapppppp is  listening at port 3000');
});
