//豆瓣读书评分9.0+
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var fs = require('fs');
var express = require('express');
var app = express();

var urlArr = [];
var data;

for(var i = 1; i <= 20; i++) {
    var url = 'https://www.douban.com/doulist/1264675/?start='+(i-1)*25+'&sort=seq&sub_type=';
    urlArr.push(url);
}
console.log(urlArr);

app.get('/',(req, res) => {
    async.mapLimit(urlArr, 5, (url, callback) => {
        superagent.get(url).end((err, result) => {
            if (err) console.error(err);
            var $ = cheerio.load(result.text);
            var jsonData = [];
            $('.article .doulist-item').each((index, element) => {
                var $element = $(element);
                jsonData.push({
                    title: $element.find('.title').children('a').text().trim(),
                    rating_nums: $element.find('.rating_nums').text().trim(),
                    rating_person: $element.find('.rating').children('span:last-child').text().trim(),
                    abstract: $element.find('.abstract').text().trim(),
                    detail: $element.find('.post').children('a').attr('href'),
                    img: $element.find('.post').children('a').children('img').attr('src')
                })
            });

            callback(null,JSON.stringify(jsonData));
        })
    },(err, result) => {
        res.send(result);
        fs.writeFile('douban9.0.json', result, (err) => {
            if (err) console.error(err);
            console.log("数据写入成功！");
        });
    });
});

app.listen(3000,(req, res) => {
    console.log('listen at port 3000');
})

