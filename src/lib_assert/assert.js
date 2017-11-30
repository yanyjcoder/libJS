/**
 * assert断言库
 * @constructor _lib_assertJS
 */
var _lib_assertJS = function () {

    var commonJS = _lib_commonJS();

    /**
     * 自定义异常
     * @param {string} msg
     * @return {Error}
     */
    var assertError = function (msg) {
        return new Error(msg);
    };
    var _assertFn = assertError;
    return {

        /**
         * 设置断言false执行的方法
         * @param {function} fn
         * @memberOf _lib_assertJS
         */
        setAssertFn: function (fn) {
            if(typeof fn === 'function' ) {
                _assertFn = fn;
            }
        },
        /**
         * 自定义断言方法，根据传入的function来判断
         * @param {function} fn
         * @param {string} msg
         * @memberOf _lib_assertJS
         */
        assert: function (fn, msg) {
            if(fn.call()) {
                return true;
            }

            if(commonJS.isHasClassName(_assertFn, 'Error')) {
                throw _assertFn(msg);
            }

            _assertFn(msg);

        }
    }
};