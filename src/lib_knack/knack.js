/**
 * Knack 工具类
 * @constructor _lib_knackJS
 * @classdesc Knack工具类
 */
var _lib_knackJS = function () {
    return {
        /**
         * 获取文件后缀名
         * @memberOf _lib_knackJS
         * @param {string} fileName
         * @return {undefined|String}
         */
        getFileNameExtension: function (fileName) {
            if(!fileNameStr){
                return void 0;
            }
            var fileNameStr = fileName + '';
            return fileNameStr.slice((fileNameStr.lastIndexOf(".") - 1 >>> 0) + 2);
        },
        /**
         * 获取16进制颜色值
         * @memberOf _lib_knackJS
         * @param {boolean} widthPoundKey  默认为false，true时返回带有#建
         * @returns {string}
         */
         getHexadecimalColor: function (widthPoundKey) {
             return (widthPoundKey ? '#' : '') + Math.floor(Math.random() * (2 << 23)).toString(16);
         }
    };
};

