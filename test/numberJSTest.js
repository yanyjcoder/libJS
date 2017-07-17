/**
 * Created by yanyj on 2017/7/10.
 */
var libJS = require('../dist/libJS');
var Performance = require('../lib/performance.test');


var parseToNumber = function (a) {
  return +a;
};

var arr  = [];
arr.length = 1000000;

Performance.performance(['for#1', 'for#2'], function(){
    for(var i=0; i < arr.length; i ++) {}
}, function () {
    for(var i = 0, len = arr.length; i < len; i ++) {}
});

// console.log(libJS.number.getIntNumber('123.12a'));
