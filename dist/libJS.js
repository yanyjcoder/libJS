/**
 * 工具类集合，可通过libJS.XXX.xxx访问其工具类的属性
 * @module libJS
 */

(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.

        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.libJS = factory();
    }
}(this, function () {

/**
 * 公共类
 * @constructor _lib_commonJS
 */

function _lib_commonJS() {

    var _common = {
        /**
         *检查输入的值与类型是否匹配
         * @param {object} typeOfValue 被检测的值
         * @param {string} type 检测类型
         */
        typeOfValue: function (typeOfValue, type) {
            return typeof typeOfValue === type;
        }
    };


    return _common
}


/**
 * Number工具类
 * @constructor _lib_numberJS
 */


var _lib_numberJS = function () {


    var commonJS = _lib_commonJS();

    /**
     *
     *  判断参数是否为数字
     * @param {object} object 检测对象
     * @return {boolean} true/false
     */

    function isNumber(object) {
        return commonJS.typeOfValue(object, "number");
    }




    /**
     *
     * 将参数转化为数字 当输入的值首字母非数字时会抛出异常
     * @param {object} value 要转换的值
     * @returns {Number}
     */
    function covertObjectToNumber(value) {
        var valueStr = value.toString();
        if(!_isNumberByIndex(valueStr, 0))  {
            throw new Error("参数非法，首字母必须为数字!")
        }
        return valueStr.indexOf(".") === -1 ? parseInt(valueStr) : parseFloat(valueStr);
    }

    /**
     * 判断指定位置是否为数字
     * @param {string} str 字符串
     * @param {number} index 位置（从0开始）
     * @returns {boolean}
     */
    function _isNumberByIndex(str, index) {

        return !!parseInt(str.charAt(index));
    }

    return {
        isNumber: isNumber,
        covertObjectToNumber: covertObjectToNumber
    };

};









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




    return {
        /**
         * libJS中的common公共类
         * @see {@link -lib_commonJS.html _lib_commonJS}.
         *
         * @property common  _lib_commonJS 通过libJS.common可访问
         */
        common: _lib_commonJS(),
        /**
         * libJS中的Number工具类
         * @property number _lib_numberJS 通过libJS.number可访问
         */
        number: _lib_numberJS(),
        /**
         * libJS中的String工具类
         * @property string _lib_stringJS 通过libJS.string可访问
         */
        string: _lib_stringJS()
    };


}));
