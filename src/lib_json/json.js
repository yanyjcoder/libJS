
/**
 * Json 工具类
 * @constructor _lib_jsonJS
 */
var _lib_jsonJS = function () {
    return {
        /**
         * 转换为object
         * @memberOf _lib_jsonJS
         * @param {object|string} value
         * @return {*}
         */
        parse: function (value) {
            return 'object' === typeof value ? value : JSON.parse(value);
        }
    };
};

