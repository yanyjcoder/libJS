/**
 * array工具类
 * @constructor _lib_arrayJS
 */
var _lib_arrayJS = function () {



    return {
        /**
         * 判断数组中是否包含指定值， ie兼容
         * @memberOf _lib_arrayJS
         * @param {object} value 查询值
         * @param {array} array 检测数组
         * @return number
         */
        contains: function (value, array) {

            return -1;
        },
        /**
         * @memberOf _lib_arrayJS
         * @param {Array} array
         * @param {Number} length
         */
        setSize: function (array, length) {
          array.length = length;
        },

        /**
         * 更安全清空数组, 使用时注意是否还有其它变量引用该数组
         * @memberOf _lib_arrayJS
         * @param {Array} array
         */
        empty: function (array) {
            this.setSize(array, 0);
        },

        /**
         * 打乱数组
         * @memberOf _lib_arrayJS
         * @param arr
         * @return {*}
         */
        shuffle: function(arr) {
            var i,
                j,
                temp;
            for (i = arr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
            return arr;
        }

    }
};
