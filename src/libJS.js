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
        /**
         * libJS中的Date工具类
         * @property date _lib_dateJS 通过libJS.date可访问
         */
        date: _lib_dateJS(),
        /**
         * libJS中的Web工具类
         * @property web _lib_webJS 通过libJS.web可访问
         */
        web: _lib_webJS(),
        /**
         * libJS中的Json工具类
         * @property json _lib_jsonJS 通过libJS.json可访问
         */
        json: _lib_jsonJS(),
        /**
         * libJS中的Coordinate工具类
         * @property json _lib_coordinateJS 通过libJS.coordinate可访问
         */
        coordinate: _lib_coordinateJS(),
        /**
         * libJS中的Function工具类
         * @property json _lib_functionJS 通过libJS.Function可访问
         */
        Function: _lib_functionJS(),
    };


}));