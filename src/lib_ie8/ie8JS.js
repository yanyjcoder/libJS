/**
 * ie8 兼容类（提供ie8不兼容的高阶方法）
 * @constructor _lib_ie8JS
 */
var _lib_ie8JS = function () {

    //Function
    ie8_extend_function();
    //Array
    ie8_extend_array();
};
/**
 * Function 兼容类
 */
function ie8_extend_function() {
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }
            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };
            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();
            return fBound;
        };
    }

    if(!Function.prototype.apply){
        Function.prototype.apply = function(obj, args){
            obj = obj == undefined ? window : Object(obj);//obj可以是js基本类型
            var i = 0, ary = [], str;
            if(args){
                for( len=args.length; i<len; i++ ){
                    ary[i] = "args[" + i + "]";
                }
            }
            obj._apply = this;
            str = 'obj._apply(' + ary.join(',') + ')';
            try{
                return eval(str);
            }catch(e){
            }finally{
                delete obj._apply;
            }
        };
    }
//call
    if(!Function.prototype.call){
        Function.prototype.call = function(obj){
            var i = 1, args = [];
            for(var len=arguments.length; i<len; i++ ){
                args[i-1] = arguments[i];
            }
            return this.apply(obj, args);
        };
    }
}

/*
 * Array 兼容类
 */

function ie8_extend_array() {

    array_extend_forEach();
}

//array_forEach
function array_extend_forEach() {
    //监测Array是否已经有forEach实现
    if (typeof Array.prototype.forEach !== "function") {
        Array.prototype.forEach = function (fn, context) {
            for (var k = 0, length = this.length; k < length; k++) {
                if (typeof fn === "function" && Object.prototype.hasOwnProperty.call(this, k)) {
                    fn.call(context, this[k], k, this);
                }
            }
        };
    }

    
}
