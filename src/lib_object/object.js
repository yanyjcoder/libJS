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
        has: _has,
        /**
         * 合并对象（非jquery实现）
         * @memberOf _lib_objectJS
         * @param {{}}option
         * @return {*|{}}
         */
        extend: function (option) {
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
                i = 1,
                length = arguments.length,
                deep = false,
                toString = Object.prototype.toString,
                hasOwn = Object.prototype.hasOwnProperty,
                push = Array.prototype.push,
                slice = Array.prototype.slice,
                trim = String.prototype.trim,
                indexOf = Array.prototype.indexOf,
                class2type = {
                    "[object Boolean]": "boolean",
                    "[object Number]": "number",
                    "[object String]": "string",
                    "[object Function]": "function",
                    "[object Array]": "array",
                    "[object Date]": "date",
                    "[object RegExp]": "regexp",
                    "[object Object]": "object"
                },
                jQuery = {
                    isFunction: function (obj) {
                        return jQuery.type(obj) === "function"
                    },
                    isArray: Array.isArray ||
                    function (obj) {
                        return jQuery.type(obj) === "array"
                    },
                    isWindow: function (obj) {
                        return obj != null && obj == obj.window
                    },
                    isNumeric: function (obj) {
                        return !isNaN(parseFloat(obj)) && isFinite(obj)
                    },
                    type: function (obj) {
                        return obj == null ? String(obj) : class2type[toString.call(obj)] || "object"
                    },
                    isPlainObject: function (obj) {
                        if (!obj || jQuery.type(obj) !== "object" || obj.nodeType) {
                            return false
                        }
                        try {
                            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                                return false
                            }
                        } catch (e) {
                            return false
                        }
                        var key;
                        for (key in obj) {}
                        return key === undefined || hasOwn.call(obj, key)
                    }
                };
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                i = 2;
            }
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {}
            }
            if (length === i) {
                target = this;
                --i;
            }
            for (i; i < length; i++) {
                if ((options = arguments[i]) != null) {
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        if (target === copy) {
                            continue
                        }
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : []
                            } else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            // WARNING: RECURSION
                            target[name] = extend(deep, clone, copy);
                        } else if (copy !== undefined) {
                            target[name] = copy;
                        }
                    }
                }
            }
            return target;
        }
    }

};
