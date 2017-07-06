/**
 * Created by yanyj on 2017/7/5.
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
 * Created by yanyj on 2017/7/6.
 */

function _commonJS() {

    var _common = {
        /**
         *
         * @param {object} typeOfValue
         * @param {string} type
         */
        typeOfValue: function (typeOfValue, type) {
            return typeof typeOfValue === type;
        }
    };


    return _common
}


/**
 * Created by yanyj on 2017/7/5.
 */


var _lib_Number = function () {

    var commonJS = _commonJS();

    /**
     * 判断是否是数字
     * @param {number} number
     * @return {boolean}
     * @private
     */
    function _isNumber(number) {
        return commonJS.typeOfValue(number, "number");
    }

    /**
     *
     * @param {object} value
     * @returns {Number}
     */
    function _covertObjectToNumber(value) {
        var valueStr = value.toString();
        if(!_isNumberByIndex(valueStr, 0))  {
            throw new Error("参数非法，首字母必须为数字")
        }
        return valueStr.indexOf(".") === -1 ? parseInt(valueStr) : parseFloat(valueStr);
    }

    function _isNumberByIndex(str, index) {

        return !!parseInt(str.charAt(index));
    }




    return {
        isNumber: _isNumber,
        covertObjectToNumber: _covertObjectToNumber
    };

};


/**
 * Created by yanyj on 2017/7/5.
 */

    return {
        number: _lib_Number()
    };


}));
