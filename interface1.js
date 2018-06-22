var express = require('express');
var app = express();

var mysql = require('mysql');
//配置模块
var settings = require('./db');
//连接数据库
var connection = mysql.createConnection(settings.db);
connection.connect();
//查询
var selectSQL = 'select * from `websites`';
var result='';
connection.query(selectSQL, function(err, rows) {
    if (err) throw err;
    // for (var i = 0; i < rows.length; i++) {
    //     arr[i] = rows[i].name;
    // }
    // for(var i in rows){

    //      /*   console.log(rows);
    //     var temp=rows[i].id;
    //     console.log(temp);*/
    // }
    result=JSON.stringify(rows);//转换成JSON String格式
    //把搜索值输出
    app.get('/interface', function(req, res) {
        res.send(result);
    });


});
//关闭连接
connection.end();
app.listen(3000);