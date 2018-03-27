/**
 * 公共类
 * @constructor _lib_commonJS
 */

function _lib_commonJS() {

    var _common = {
        /**
         *  检查输入的值与类型是否匹配 只能检测基本类型
         * @memberOf _lib_commonJS
         * @param {object} typeOfValue 被检测的值
         * @param {string} type 检测类型
         */
        typeOfValue: function (typeOfValue, type) {
            return typeof typeOfValue === type;
        },

        /**
         * 检测复杂类型
         * @memberOf _lib_commonJS
         * @param value 被检测的值
         * @param {string} name 检测类型
         * @return {boolean}
         */
        isHasClassName: function(value, name) {
            name = '[object ' + name + ']';
            return toString.call(value) === name;
        },
        /**
         * 测试性能
         * @param {String} desc 描述
         * @param {Function} fn 测试方法
         */
        run: function (desc, fn) {
            console.time(desc);
            fn && fn();
            console.timeEnd(desc);
        }

    };


    return _common
}

