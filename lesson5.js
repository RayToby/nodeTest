var async = require('async');
var express = require('express');
var app = express();

app.get('/', (req, res) => {
    var currentCount = 0;
    var fetchUrl = (url, callback) => {
        var delay = parseInt(Math.random() * 1000000 % 2000, 10);
        currentCount ++;
        console.log('现在的并发数是', currentCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');

        setTimeout(() => {
            currentCount --;
            callback(null, url + 'html content');
        }, delay);
    }

    var urls = [];
    for(var i = 0; i <= 30; i++) {
        urls.push('http://datasource_' + i);
    }

    async.mapLimit(urls, 5, (url, callback) => {
        fetchUrl(url, callback);
    },(err, result) => {
        console.log('final:' + result);
        res.send(result);
    });
});

app.listen(3000,(req, res) => {
    console.log('port 3---')
})
