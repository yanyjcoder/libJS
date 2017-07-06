/**
 * String工具类，可通过libJS.string 访问
 * @constructor _lib_stringJS
 *
 */
function _lib_stringJS() {

    var comonJS = _lib_commonJS();

    /**
     *
    * 判断是否是字符串
    * @param {{}} object
    * @returns {*}
    */
    function isString(object) {
        return comonJS.typeOfValue(object, 'string');
    }
    return {
          isString: isString
    };
}



