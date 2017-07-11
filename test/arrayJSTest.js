/**
 * Created by yanyj on 2017/7/10.
 */
var libJS = require('../dist/libJS');
var Performance = require('../lib/performance.test');

function getArray(length) {
    var array = [];
    for(var i = 0; i < length; i++) {
        array.push(i);
    }
    return array;
}


var testArray = getArray(1000);

function emty(array) {
    array = [];
}
// Performance.performance(['libJS#array#emty', 'empty'], function () {
//     libJS.array.empty(testArray);
// }, function () {
//     emty(testArray);
// });

console.error(libJS.array.shuffle([1,2,3,4,5,6,7,8,9,10]));