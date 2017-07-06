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








