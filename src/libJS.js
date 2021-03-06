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
        root.lib = root.libJS;
    }
}(this, function () {
//split
    return {
        /**
         * libJS中的common公共类
         * @see {@link -lib_commonJS.html _lib_commonJS}.
         *
         * @property common  _lib_commonJS 通过libJS.common访问
         */
        common: _lib_commonJS(),
        /**
         * libJS中的Number工具类
         * @property number _lib_numberJS 通过libJS.number访问
         */
        number: _lib_numberJS(),
        /**
         * libJS中的String工具类
         * @property string _lib_stringJS 通过libJS.string访问
         */
        string: _lib_stringJS(),
        /**
         * libJS中的Object工具类
         * @property object _lib_objectJS 通过libJS.object访问
         */
        object: _lib_objectJS(),
        /**
         * libJS中的Array工具类
         * @property array _lib_arrayJS 通过libJS.array访问
         */
        array: _lib_arrayJS(),
        /**
         * libJS中的Date工具类
         * @property date _lib_dateJS 通过libJS.date访问
         */
        date: _lib_dateJS(),
        /**
         * libJS中的Web工具类
         * @property web _lib_webJS 通过libJS.web访问
         */
        web: _lib_webJS(),
        /**
         * libJS中的Json工具类
         * @property json _lib_jsonJS 通过libJS.json访问
         */
        json: _lib_jsonJS(),
        /**
         * libJS中的Coordinate工具类
         * @property json _lib_coordinateJS 通过libJS.coordinate访问
         */
        coordinate: _lib_coordinateJS(),
        /**
         * libJS中的Function工具类
         * @property json _lib_functionJS 通过libJS.Function访问
         */
        Function: _lib_functionJS(),
        /**
         * libJS中的ie8兼容类
         * @property json _lib_ie8JS 通过libJS.ie8访问
         */
        ie8: _lib_ie8JS(),
        /**
         * libJS中的knack小技巧类
         * @property knack _lib_knackJS 通过libJS.knack访问
         */
        knack: _lib_knackJS(),
        /**
         * libJS中的assert断言库
         * @property assert _lib_assertJS 通过libJS.assert访问
         */
        assert: _lib_assertJS(),
        /**
         * libJS中的validate类
         * @property json _lib_validateJS 通过libJS.validate访问
         */
        validate: _lib_validateJS()
    };


}));