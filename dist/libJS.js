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
        }


    };


    return _common
}


/**
 * Function 工具类
 * @constructor _lib_functionJS
 */
var _lib_functionJS = function () {
    var common = _lib_commonJS();
    return {
        /**
         * 判断是否是函数对象
         * @memberOf _lib_functionJS
         * @param value
         * @return {boolean}
         */
        isFunction: function (value) {
            return common.isHasClassName(value, 'Function');
        }
    };
};
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









/**
 *  object工具类
 * @constructor _lib_objectJS
 */
var _lib_objectJS = function () {

    var commonJS = _lib_commonJS();
    var functionJS = _lib_functionJS();

    /**
     *
     * @param a
     * @param b
     * @param aStack
     * @param bStack
     * @return {*}
     * @private
     */
        // Internal recursive comparison function for `isEqual`.
    var _eq = function (a, b, aStack, bStack) {
            // Identical objects are equal. `0 === -0`, but they aren't identical.
            // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
            if (a === b) return a !== 0 || 1 / a === 1 / b;
            // A strict comparison is necessary because `null == undefined`.
            if (a == null || b == null) return a === b;
            // Unwrap any wrapped objects.
            // Compare `[[Class]]` names.
            var className = toString.call(a);
            if (className !== toString.call(b)) return false;
            switch (className) {
                // Strings, numbers, regular expressions, dates, and booleans are compared by value.
                case '[object RegExp]':
                // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
                case '[object String]':
                    // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                    // equivalent to `new String("5")`.
                    return '' + a === '' + b;
                case '[object Number]':
                    // `NaN`s are equivalent, but non-reflexive.
                    // Object(NaN) is equivalent to NaN
                    if (+a !== +a) return +b !== +b;
                    // An `egal` comparison is performed for other numeric values.
                    return +a === 0 ? 1 / +a === 1 / b : +a === +b;
                case '[object Date]':
                case '[object Boolean]':
                    // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                    // millisecond representations. Note that invalid dates with millisecond representations
                    // of `NaN` are not equivalent.
                    return +a === +b;
            }
            if (typeof a != 'object' || typeof b != 'object') return false;
            // Assume equality for cyclic structures. The algorithm for detecting cyclic
            // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
            var length = aStack.length;
            while (length--) {
                // Linear search. Performance is inversely proportional to the number of
                // unique nested structures.
                if (aStack[length] === a) return bStack[length] === b;
            }
            // Objects with different constructors are not equivalent, but `Object`s
            // from different frames are.
            var aCtor = a.constructor, bCtor = b.constructor;
            if (
                aCtor !== bCtor &&
                // Handle Object.create(x) cases
                'constructor' in a && 'constructor' in b &&
                !(functionJS.isFunction(aCtor) && aCtor instanceof aCtor && functionJS.isFunction(bCtor) && bCtor instanceof bCtor)
            ) {
                return false;
            }
            // Add the first object to the stack of traversed objects.
            aStack.push(a);
            bStack.push(b);
            var size, result;
            // Recursively compare objects and arrays.
            if (className === '[object Array]') {
                // Compare array lengths to determine if a deep comparison is necessary.
                size = a.length;
                result = size === b.length;
                if (result) {
                    // Deep compare the contents, ignoring non-numeric properties.
                    while (size--) {
                        if (!(result = _eq(a[size], b[size], aStack, bStack))) break;
                    }
                }
            } else {
                // Deep compare objects.
                var keys = _keys(a), key;
                size = keys.length;
                // Ensure that both objects contain the same number of properties before comparing deep equality.
                result = _keys(b).length === size;
                if (result) {
                    while (size--) {
                        // Deep compare each member
                        key = keys[size];
                        if (!(result = _has(b, key) && _eq(a[key], b[key], aStack, bStack))) break;
                    }
                }
            }
            // Remove the first object from the stack of traversed objects.
            aStack.pop();
            bStack.pop();
            return result;
        };
    var _has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

    var _keys = function (obj) {
        if (!_isObject(obj)) return [];
        // if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_has(obj, key)) keys.push(key);
        // Ahem, IE < 9.
        // if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };

    var _isObject = function (value) {
        return commonJS.isHasClassName(value, 'Object');
    };
    return {
        /**
         * 判断对象是否拥有属性
         * @memberOf _lib_objectJS
         * @param propertyName 属性名
         * @param object 待判断对象
         * @returns {boolean}
         */
        hasProperty: function (propertyName, object) {
            return propertyName in object;
        },


        /**
         *  两个对象是否相等
         * @memberOf _lib_objectJS
         * @param object1 对象1
         * @param object2 对象2
         * @return {*}
         */
        isEqual: function (object1, object2) {
            return _eq(object1, object2, [], []);
        },

        /**
         * 判断是否是对象
         * @memberOf _lib_objectJS
         * @param value
         * @return {*|boolean}
         */
        isObject: _isObject,


        /**
         * 返回对象所有的属性
         * @memberOf _lib_objectJS
         * @param {object} obj
         * @return {*}
         */
        keys: _keys,

        /**
         *  检测对象是否有用某属性
         * @memberOf _lib_objectJS
         * @param obj
         * @param {string} key
         * @return {boolean|*}
         */
        has: _has

    }

};

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
        }
    }
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
        string: _lib_stringJS(),
        /**
         * libJS中的Object工具类
         * @property object _lib_objectJS 通过libJS.object可访问
         */
        object: _lib_objectJS(),
        /**
         * libJS中的Array工具类
         * @property array _lib_arrayJS 通过libJS.array可访问
         */
        array: _lib_arrayJS(),
    };


}));
