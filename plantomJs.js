// const http = require('http');
const webpage = require('webpage');
const page = webpage.create();
export function phantomjs() {
    page.open('http://jandan.net/ooxx/page-46#comments',function(res) {
    console.log("Status: " + res);
    if (res === 'success') {
        console.log('1111');
        page.render('example.png');
        console.log(page.content);
    } else{
        console.log('fail')
    }
    // page.close();
    phantom.exit();
})
}



// const data = http.request('http://jandan.net/ooxx/', (req, res) => {
//     res
// });

// var page = require('webpage').create();
// page.open('http://cuiqingcai.com', function (status) {
//     console.log("Status: " + status);
//     if (status === "success") {
//         page.render('example.png');
//     }
//     phantom.exit();
// });