/**
 * Function 工具类
 * @constructor _lib_functionJS
 */
var _lib_functionJS = function () {
    var common = _lib_commonJS();
    return {
        /**
         * 判断是否是函数对象
         * @memberOf _lib_functionJS
         * @param value
         * @return {boolean}
         */
        isFunction: function (value) {
            return common.isHasClassName(value, 'Function');
        },
        /**
         * arguments 转换为数组
         * @memberOf _lib_functionJS
         * @param {object}value
         * @return []
         */
        args2array: function (args) {
            return Array.prototype.slice.call(args);;
        },
        /**
         * 回调函数
         * @memberOf _lib_functionJS
         * @return {function}
         */
        flow: function () {
            var funcs = this.args2array(arguments);
            return function (args) {
                var i = 0;
                var result = funcs[i++].call(this, args);
                while (i < funcs.length) {
                    result = funcs[i++].call(this, result);
                }

                return result;
            }

        }
    };
};