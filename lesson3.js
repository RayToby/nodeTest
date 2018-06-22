//使用 superagent 与 cheerio 完成简单爬虫
var superagent = require('superagent');
var cheerio = require('cheerio');
var express = require('express');
var app = express();

app.get('/', (req, res) => {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://www.runoob.com/nodejs/nodejs-buffer.html')
        .end((err, sres) => {
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            // 剩下就都是 jquery 的内容了
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#leftcolumn a').each(function(index, element) {
                // debugger;
                var $element = $(element);
                items.push({
                    text: $element.text(),
                    href: $element.attr('href')
                });
            });
            res.send(items);

        });
});


app.listen(3000,(req, res) => {
    console.log('app is running at port 3000');
});
