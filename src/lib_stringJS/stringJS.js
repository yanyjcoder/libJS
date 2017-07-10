/**
 * String工具类，可通过libJS.string 访问
 * @constructor _lib_stringJS
 *
 */
function _lib_stringJS() {

    var comonJS = _lib_commonJS();

    return {
        /**
         *
         * 判断是否是字符串
         * @memberOf _lib_stringJS
         * @param {{}} object
         * @returns {*}
         */
        isString: function (object) {
            return comonJS.typeOfValue(object, 'string');
        }
    }
}



