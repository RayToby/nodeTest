//eventproxy 并发  爬取(20条内最好，防止被封ip)多条数据
var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');
var codeUrl = 'https://cnodejs.org';
var express = require('express');
var app = express();

app.get('/',(req1, res1) => {
    superagent.get(codeUrl)
    .end((err, res) => {
        if (err) return console.error(err);
        var topicUrls = [];
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each((index, element) => {
            var $element = $(element);
            var href = url.resolve(codeUrl, $element.attr('href'));
            topicUrls.push(href);
        })
        // console.log(topicUrls);

        var ep = new eventproxy();
        ep.after('topic_html', topicUrls.length, (topics) => {
            topics = topics.map((topicPair) => {
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                return({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    commont1: $('.reply_content').eq(0).text().trim(),
                    author: $('.reply_author').eq(0).text().trim()
                });
            });

            // console.log('final:'+ topics);
            res1.send(topics);
        });

        topicUrls.forEach((topicUrl) => {
            superagent.get(topicUrl)
                .end((err, res) => {
                    // console.log('fetch ' + topicUrl + ' successful');
                    ep.emit('topic_html', [topicUrl, res.text]);
                });
        });
    });
});

app.listen(3000,(req, res) => {
    console.log('port 3000')
});
