/**
 * Function 工具类
 * @constructor _lib_functionJS
 */
var _lib_functionJS = function () {
    var common = _lib_commonJS();
    return {
        /**
         * 判断是否是函数对象
         * @param value
         * @return {boolean}
         */
        isFunction: function (value) {
            return common.isHasClassName(value, 'Function');
        }
    };
};