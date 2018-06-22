var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');

var options = [];  //用于存储网址链接的数组
var n=0;


//先生称图片地址链接的数组
for (var i = 27; i <47; i++) {
    var obj = {
        url: 'http://jandan.net/ooxx/page-' + i + '#comments',
        headers:{
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'
        }
    }
    options.push(obj);
}


//用来处理这个调用逻辑的总函数
function all(err, res, body) {
    // console.log(res.body)
    var $ = cheerio.load(body);
    n=n+$(".commentlist img").length;
    console.log(n);
    $(".commentlist img").each(function (i, ele) {
        var imgsrc = 'http:' + $(this).attr('src');
        var fileName = FileName(imgsrc.toString());
        //下载文件操作
        downloadImg(imgsrc, fileName, function () {
            console.log(fileName + 'upload 完成');
        });
    })
}
//格式化图片名称
function FileName(url) {
    var fileName = path.basename(url);
    return fileName;
}
//利用fs模块download图片
function downloadImg(url, filename, callback) {
    var stream = fs.createWriteStream('images/' + filename);
    request(url).on('error',function(){
        console.log('done no');
    }).pipe(stream).on('close', callback);
}



//利用async的mapLimit方法实现限定并发数为3的调用
async.mapLimit(options,3, function (option, callback) {
    request(option, all);
    callback(null);
}, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        // console.log(result);
        console.log('全部检索完毕');
    }
})




{/* <div class="text"><span class="righttext"><a href="//jandan.net/ooxx/page-38#comment-3862396">3862396</a></span><p><img src="//img.jandan.net/img/blank.gif" onload="jandan_load_img(this)" /><span class="img-hash">Ly93eDMuc2luYWltZy5jbi9tdzYwMC82YTEyYmU0N2x5MWZzZnY5Nm9mZmtqMjFzMDJkY2hkdC5qcGc=</span></p>
</div>


<div class="text"><span class="righttext"><a href="//jandan.net/ooxx/page-38#comment-3862311">3862311</a></span><p><img src="//img.jandan.net/img/blank.gif" onload="jandan_load_img(this)" /><span class="img-hash">Ly93eDMuc2luYWltZy5jbi9tdzYwMC8wMDc2QlNTNWx5MWZzZzlwcXBkc3FqMzBxbzBxb3FiMS5qcGc=</span></p>
</div> */}