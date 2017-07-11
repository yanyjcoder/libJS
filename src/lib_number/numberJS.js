/**
 * Number工具类
 * @constructor _lib_numberJS
 */


var _lib_numberJS = function () {


    var commonJS = _lib_commonJS();

    return {
        /**
         *  判断参数是否为数字
         *  @memberOf _lib_numberJS
         * @param {object} object 检测对象
         * @return {boolean} true/false
         */

        isNumber: function (object) {
            return commonJS.typeOfValue(object, "number");
        },


        /**
         * 将参数转化为数字 当输入的值首字母非数字时会抛出异常
         * @memberOf _lib_numberJS
         * @param {object} value 要转换的值
         * @returns {number}
         */
        covertObjectToNumber: function (value) {
            if (this.isNumber(value)) return value;
            var valueStr = value.toString();
            return +valueStr;
        },

        /**
         * 判断指定位置是否为数字
         * @memberOf _lib_numberJS
         * @param {string} str 字符串
         * @param {number} index 位置（从0开始）
         * @returns {boolean}
         */
        isNumberByIndex: function (str, index) {

            return !!parseInt(str.charAt(index));
        },

        /**
         * 取相对数
         * @memberOf _lib_numberJS
         * @param {number} value
         */
        covertValueToRelativeNumber: function (value) {
            return -value;
        },

        /**
         * 取整
         * @memberOf _lib_numberJS
         * @param {number} value 有意义的数字或数字字符串
         * @return {number}
         */
        getIntNumber: function (value) {
            return ~~(+value);
        }
    }

};








