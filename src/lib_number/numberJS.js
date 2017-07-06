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
        return valueStr.indexOf(".") === -1 ? parseInt(valueStr) : parseFloat(valueStr);
    }




    return {
        isNumber: _isNumber,
        covertObjectToNumber: _covertObjectToNumber
    };

};

