/**
 * Created by yanyj on 2017/7/10.
 */
var libJS = require('../dist/libJS');
var Performance = require('../lib/performance.test');


var parseToNumber = function (a) {
  return +a;
};
//
// Performance.performance(['numberJS#parse', '+Parse'], function(){
//     libJS.number.covertObjectToNumber('1');
// }, function () {
//     return '1'.indexOf(".") === -1 ? parseInt('1') : parseFloat('1');
// });

console.log(libJS.number.getIntNumber('123.12a'));
