/**
 * String工具类，可通过libJS.string 访问
 * @constructor _lib_stringJS
 *
 */
function _lib_stringJS() {

    var comonJS = _lib_commonJS();

    return {
        /**
         *
         * 判断是否是字符串
         * @memberOf _lib_stringJS
         * @param {{}} object
         * @returns {*}
         */
        isString: function (object) {
            return comonJS.typeOfValue(object, 'string');
        },

        /**
         * 硬拼接字符串
         * @memberOf _lib_stringJS
         * @return {string}
         */
        stiffConcat: function () {
            var args = [];

            for(var i = 0; i < arguments; i ++) {
                args.push(arguments[i]);
            }

            return ''.concat(args)
        },

        /**
         * 将对象安全的转化为String
         * @memberOf _lib_stringJS
         * @param object 要转换的对象
         * @returns {*}
         */
        objoct2string: function(object) {
        var r = [];
        if (typeof o == "string") {
            return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
        }
        if (typeof o == "object") {
            if (!o.sort) {
                for (var i in o) {
                    r.push(i + ":" + obj2string(o[i]));
                }
                if ( !! document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                    r.push("toString:" + o.toString.toString());
                }
                r = "{" + r.join() + "}";
            } else {
                for (var i = 0; i < o.length; i++) {
                    r.push(obj2string(o[i]))
                }
                r = "[" + r.join() + "]";
            }
            return r;
        }
        return o.toString();
    }
    }
}



