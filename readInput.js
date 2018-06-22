/* 1. 同步 */
var fs = require('fs');

var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log('程序执行完毕1')



/* 2.异步 */
fs.readFile('input.txt', (err, data) =>{
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log('执行完毕2')


/* 3. EventEmitter */
var events = require('events');
var eventEmitter = new events.EventEmitter();

eventEmitter.on('someEvent', () => {
    console.log('someEvent事件触发3');
});

setTimeout(() => {
    eventEmitter.emit('someEvent');
},2000);


