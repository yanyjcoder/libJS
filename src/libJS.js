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
//split
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
        string: _lib_stringJS()
    };


}));