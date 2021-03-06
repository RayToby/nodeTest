var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var async = require('async');
var phantom = require('phantom');
// const page = require('webpage').create();

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
function all(body) {
    // console.log(res.body)
    var $ = cheerio.load(body);
    n=n+$(".commentlist img").length;
    console.log(n);
    $(".commentlist img").each(function (i, ele) {
        var imgsrc = $(this).attr('src');
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

function usePhantomjs (option) {
    let phInstance = null;
    let sitepage = null;
    phantom.create()
        .then(ph => {
            phInstance = ph;
            return ph.createPage()
        })
        .then(page => {
            sitepage = page;
            return  page.open(option.url)
        })
        .then(res => {
            console.log("Status: " + res);
            return sitepage.property('content');
        })
        .then(content => {
            // if (res === 'success') {
            //     console.log('1111');
            //     page.render('example.png');
            //     console.log(page.content);
                all(content);
            // } else{
            //     console.log('fail')
            // }
            sitepage.close();
            phInstance.exit();
        })
        .catch(err =>{

        });
    // }, {
    //     dnodeOpts: {weak: false}
    // });
    // page.open(option.url,function(res) {
    //     console.log("Status: " + res);
    //     if (res === 'success') {
    //         console.log('1111');
    //         page.render('example.png');
    //         console.log(page.content);
    //         all(page.content)
    //     } else{
    //         console.log('fail')
    //     }
    //     // page.close();
    //     phantom.exit();
    // })
}



//利用async的mapLimit方法实现限定并发数为3的调用
async.mapLimit(options,3, function (option, callback) {
    // request(option, all);
    usePhantomjs(option);
    callback(null);
}, function (err, result) {
    if (err) {
        console.log(err);
    } else {
        // console.log(result);
        console.log('全部检索完毕');
    }
})


// page.open('http://jandan.net/ooxx/page-46#comments',function(res) {
//     console.log("Status: " + res);
//     if (res === 'success') {
//         console.log('1111');
//         page.render('example.png');
//         console.log(page.content);
//     } else{
//         console.log('fail')
//     }
//     // page.close();
//     phantom.exit();
// })
