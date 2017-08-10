/**
 * array工具类
 * @constructor _lib_arrayJS
 */
var _lib_arrayJS = function () {



    return {
        /**
         * 排序算法集合
         * @memberOf _lib_arrayJS
         * @class sort
         */
        sort: {
            /**
             * 冒泡排序
             * @memberOf   _lib_arrayJS.sort
             * @param {array} array 待排序数组
             */
            bubble: function (array) {
                var len = array.length;
                for (var i = 0; i < len; i++) {
                    for (var j = 0; j < len - 1 - i; j++) {
                        if (array[j] > array[j + 1]) {        //相邻元素两两对比
                            var temp = array[j + 1];        //元素交换
                            array[j + 1] = array[j];
                            array[j] = temp;
                        }
                    }
                }
            },
            /**
             * 选择排序
             * @memberOf   _lib_arrayJS.sort
             * @param {array} array 待排序数组
             */
            select: function (array) {
                var len = array.length;
                var minIndex, temp;
                for (var i = 0; i < len - 1; i++) {
                    minIndex = i;
                    for (var j = i + 1; j < len; j++) {
                        if (array[j] < array[minIndex]) {     //寻找最小的数
                            minIndex = j;                 //将最小数的索引保存
                        }
                    }
                    temp = array[i];
                    array[i] = array[minIndex];
                    array[minIndex] = temp;
                }
            },
            /**
             * 插入排序
             * @memberOf   _lib_arrayJS.sort
             * @param {array} array 待排序数组
             */
            insert: function (array) {
                var len = array.length;
                var preIndex, current;
                for (var i = 1; i < len; i++) {
                    preIndex = i - 1;
                    current = array[i];
                    while(preIndex >= 0 && array[preIndex] > current) {
                        array[preIndex+1] = array[preIndex];
                        preIndex--;
                    }
                    array[preIndex+1] = current;
                }
            },
            shell: function (array) {
                var len = array.length,
                    temp,
                    gap = 1;
                while(gap < len/3) {          //动态定义间隔序列
                    gap =gap*3+1;
                }
                for (gap; gap> 0; gap = Math.floor(gap/3)) {
                    for (var i = gap; i < len; i++) {
                        temp = array[i];
                        for (var j = i-gap; j > 0 && array[j]> temp; j-=gap) {
                            array[j+gap] = array[j];
                        }
                        array[j+gap] = temp;
                    }
                }
            }
        },
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
        },

        copy: function (array) {

            return array.slice();
        }
    }
};
