/**
 * validate 工具类 提供验证一些特殊字符串的功能
 * @constructor _lib_validateJS
 */
var _lib_validateJS = function () {
    
    return {
        /**
         * 检测是否是中文名
         * @param name 待检测中文名
         * @returns {boolean}
         */
        isChineseName: function (name) {
            return /^[\u4E00-\u9FA5]{2,4}$/.test(name);
        }
    };
};
