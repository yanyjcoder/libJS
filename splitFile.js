/**
 * Created by yanyj on 2017/7/6.
 */
var split = require('./lib/file');

split("./src/libJS.js", "//split", '', ["./src/libJS/libJS.header","./src/libJS/libJS.tail"]);