var express = require('express');
var fs = require('fs');
var app = express();

app.get('/getDouban', (req, res) => {
    fs.readFile('../douban9.0.json', (err, data) => {
        if (err) console.error(err);
        if (data) {
            res.json({doubanData: data.toString()});
        }
    })
});


// app.listen(3000, (req, res) => {
//     console.log('port at 3000')
// });

app.use(express.static("public")).listen(3000, (req, res) => {
        console.log('port at 3000')
});
