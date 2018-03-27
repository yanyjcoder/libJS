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
        /**
         * 获取数组中随机一项
         * @memberOf _lib_arrayJS
         * @param arr
         * @return {*}
         */
        getRandomItem: function(arr) {
            return arr[Math.floor(Math.random() * arr.length)];
        },
        copy: function (array) {
            return array.slice();
        }
    }
};

/**
 * assert断言库
 * @constructor _lib_assertJS
 */
var _lib_assertJS = function () {

    var commonJS = _lib_commonJS();

    /**
     * 自定义异常
     * @param {string} msg
     * @return {Error}
     */
    var assertError = function (msg) {
        return new Error(msg);
    };
    var _assertFn = assertError;
    return {

        /**
         * 设置断言false执行的方法
         * @param {function} fn
         * @memberOf _lib_assertJS
         */
        setAssertFn: function (fn) {
            if(typeof fn === 'function' ) {
                _assertFn = fn;
            }
        },
        /**
         * 自定义断言方法，根据传入的function来判断
         * @param {function} fn
         * @param {string} msg
         * @memberOf _lib_assertJS
         */
        assert: function (fn, msg) {
            if(fn.call()) {
                return true;
            }

            if(commonJS.isHasClassName(_assertFn, 'Error')) {
                throw _assertFn(msg);
            }

            _assertFn(msg);

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


/**
 * 经纬度转换类
 * @constructor _lib_coordinateJS
 */
function _lib_coordinateJS() {

    //定义一些常量
    var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
    var PI = 3.1415926535897932384626;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;

    /**
     * 百度坐标系 (BD-09) 与 火星坐标系 (GCJ-02)的转换
     * 即 百度 转 谷歌、高德
     * @param {Number}bd_lon
     * @param {Number} bd_lat
     * @memberOf _lib_coordinateJS
     * @returns []
     */
    var bd09togcj02 = function bd09togcj02(bd_lon, bd_lat) {
        var bd_lon = +bd_lon;
        var bd_lat = +bd_lat;
        var x = bd_lon - 0.0065;
        var y = bd_lat - 0.006;
        var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_PI);
        var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_PI);
        var gg_lng = z * Math.cos(theta);
        var gg_lat = z * Math.sin(theta);
        return [gg_lng, gg_lat]
    };

    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * 即谷歌、高德 转 百度
     * @param {Number}lng
     * @param {Number} lat
     * @memberOf _lib_coordinateJS
     * @returns []
     */
    var gcj02tobd09 = function gcj02tobd09(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
        var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat]
    };

    /**
     * WGS84转GCj02
     * @param {Number}lng
     * @param {Number} lat
     * @memberOf _lib_coordinateJS
     * @returns []
     */
    var wgs84togcj02 = function wgs84togcj02(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        if (out_of_china(lng, lat)) {
            return [lng, lat]
        } else {
            var dlat = transformlat(lng - 105.0, lat - 35.0);
            var dlng = transformlng(lng - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            var mglat = lat + dlat;
            var mglng = lng + dlng;
            return [mglng, mglat]
        }
    };

    /**
     * GCJ02 转换为 WGS84
     * @param {Number}lng
     * @param {Number} lat
     * @memberOf _lib_coordinateJS
     * @returns []
     */
    var gcj02towgs84 = function gcj02towgs84(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        if (out_of_china(lng, lat)) {
            return [lng, lat]
        } else {
            var dlat = transformlat(lng - 105.0, lat - 35.0);
            var dlng = transformlng(lng - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            var mglat = lat + dlat;
            var mglng = lng + dlng;
            return [lng * 2 - mglng, lat * 2 - mglat]
        }
    };

    var transformlat = function transformlat(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    };

    var transformlng = function transformlng(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    };

    /**
     * 判断是否在国内，不在国内则不做偏移
     * @param {Number}lng
     * @param {Number} lat
     * @memberOf _lib_coordinateJS
     * @returns boolean
     */
    var out_of_china = function out_of_china(lng, lat) {
        var lat = +lat;
        var lng = +lng;
        // 纬度3.86~53.55,经度73.66~135.05
        return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
    };

    return {
        bd09togcj02: bd09togcj02,
        gcj02tobd09: gcj02tobd09,
        wgs84togcj02: wgs84togcj02,
        gcj02towgs84: gcj02towgs84,
        outOfChina: out_of_china,
        /**
         * 判断是否为合法的经度
         * @param {Number} longitude
         * @memberOf _lib_coordinateJS
         * @returns boolean
         */
        checkLongitude: function (longitude) {
            return /^(((\d|[1-9]\d|1[1-7]\d|0)\.\d{0,7})|(\d|[1-9]\d|1[1-7]\d|0{1,3})|180\.0{0,7}|180)$/.test(longitude);
        },
        /**
         * 判断是否为合法的纬度
         * @param {Number} latitude
         * @memberOf _lib_coordinateJS
         * @returns boolean
         */
        checkLatitude: function (latitude) {
            return  /^([0-8]?\d{1}\.\d{0,7}|90\.0{0,7}|[0-8]?\d{1}|90)$/.test(latitude);
        }
    }

}
/**
 * Date工具类
 * @constructor _lib_dateJS
 */

function _lib_dateJS() {

    var DateEnum = {
      YEARS: 0,
      MONTHS: 1,
      DAYS: 2,
      HOURS: 3,
      MINUTES: 4,
      SECONDS: 5,
    };

    return {
        /**
         * 格式化日期
         * @memberOf _lib_dateJS
         * @param {object}date 日期或者可以转成日期的字符串和毫秒数。
         * @param {string}format 要转换的格式字符串 {yyyy:年, MM: 月,dd:日, hh:时, mm:分, ss:秒}
         * @return {*}
         */
        format: function (date, format) {
            var args = date;
            if('[object Date]' !== toString.call(date)) {
                //如果不是Date类型，就强制转换下
                date = new Date(date);
            }

            if('Invalid Date' === date.toString()) {
                throw new Error("参数非法! [" + args + '] 非法或不能转化为有效日期');
            }

            var o = {
                "M+" : date.getMonth()+1,                 //月份
                "d+" : date.getDate(),                    //日
                "h+" : date.getHours(),                   //小时
                "m+" : date.getMinutes(),                 //分
                "s+" : date.getSeconds(),                 //秒
                "q+" : Math.floor((date.getMonth()+3)/3), //季度
                "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(format)) {
                format=format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            }
            for(var k in o) {
                if(new RegExp("("+ k +")").test(format)){
                    format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
            return format;
        },

        /**
         * 校验 yyyy-MM-dd hh:mm:ss 日期字符串
         * @memberOf _lib_dateJS
         * @param {string}date 待校验的字符串
         * @return {boolean}
         */
        check: function (date) {

            var regex=/^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
            if(!regex.test(date)){
                throw new Error("格式不正确！请输入正确的时间格式，如：2010-07-07 09:12:00");
                return false;
            }
            return true;
        },

        /**
         * 计算两个日期相差的时间 不足当前日期相差格式的统一返回0
         * @memberOf _lib_dateJS
         * @param {Object}date1  日期或者可以转换未日期的字符串或毫秒数
         * @param {Object}date2  日期或者可以转换未日期的字符串或毫秒数
         * @param {Number}diffFlag 2：day ，3：hour，4：minute，5：second
         * @return {Number}
         */
        getFineDiffByDiffFlag: function (date1, date2, diffFlag) {
            var date11 = new Date(date1);
            var date22 = new Date(date2);

            if(this.isIllegalDate(date11)) {
                throw new Error("[" + date1 + "]参数非法!");
            }

            if(this.isIllegalDate(date22)) {
                throw new Error("[" + date2 + "]参数非法!");
            }
            var times = date11 >= date22 ? date11.getTime() - date22.getTime()
                                        : date22.getTime() - date11.getTime();


            switch (diffFlag) {
                case DateEnum.DAYS:
                    return parseInt(times / (1000 * 60 * 60 * 24));
                case DateEnum.HOURS:
                    return parseInt(times / (1000 * 60 * 60));
                case DateEnum.MINUTES:
                    return parseInt(times / (1000 * 60 ));
                case DateEnum.SECONDS:
                    return parseInt(times / (1000 ));
                default:
                    throw new Error('[' + diffFlag + ']参数非法！')
            }

        },

        /**
         * 获取两个日期相差的时间（精确到时分秒）
         * @memberOf _lib_dateJS
         * @param {Object} date1 日期或者可以转换未日期的字符串或毫秒数
         * @param {Object} date2 日期或者可以转换未日期的字符串或毫秒数
         * @return {{days: number, hours: number, minutes: number, seconds: number}}
         */
        getDiffTime: function (date1, date2) {

            var date11 = new Date(date1);
            var date22 = new Date(date2);

            if(this.isIllegalDate(date11)) {
                throw new Error("[" + date1 + "]参数非法!");
            }

            if(this.isIllegalDate(date22)) {
                throw new Error("[" + date2 + "]参数非法!");
            }
            var times = date11 >= date22 ? date11.getTime() - date22.getTime()
                : date22.getTime() - date11.getTime();   //时间差的毫秒数

            //------------------------------

            //计算出相差天数
            var days=Math.floor(times/(24*3600*1000));

            //计算出小时数

            var leave1=times%(24*3600*1000)  ;  //计算天数后剩余的毫秒数
            var hours=Math.floor(leave1/(3600*1000));
            //计算相差分钟数
            var leave2=leave1%(3600*1000)   ;     //计算小时数后剩余的毫秒数
            var minutes=Math.floor(leave2/(60*1000));
            //计算相差秒数
            var leave3=leave2%(60*1000) ;     //计算分钟数后剩余的毫秒数
            var seconds=Math.round(leave3/1000);

            return {
                days: days,
                hours: hours,
                minutes: minutes,
                seconds: seconds
            }
        },

        /**
         * 判断是否是非法的日期
         * @memberOf _lib_dateJS
         * @param {Date} date
         * @return {boolean}
         */
        isIllegalDate: function (date) {
            return 'Invalid Date' === date.toString();
        }

    }
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
        },
        /**
         * arguments 转换为数组
         * @memberOf _lib_functionJS
         * @param {object}value
         * @return []
         */
        args2array: function (args) {
            return Array.prototype.slice.call(args);;
        },
        /**
         * 回调函数
         * @memberOf _lib_functionJS
         * @return {function}
         */
        flow: function () {
            var funcs = this.args2array(arguments);
            return function (args) {
                var i = 0;
                var result = funcs[i++].call(this, args);
                while (i < funcs.length) {
                    result = funcs[i++].call(this, result);
                }

                return result;
            }

        }
    };
};
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


/**
 * Json 工具类
 * @constructor _lib_jsonJS
 */
var _lib_jsonJS = function () {
    return {
        /**
         * 转换为object
         * @memberOf _lib_jsonJS
         * @param {object|string} value
         * @return {*}
         */
        parse: function (value) {
            return 'object' === typeof value ? value : JSON.parse(value);
        }
    };
};


/**
 * Knack 工具类
 * @constructor _lib_knackJS
 * @classdesc Knack工具类
 */
var _lib_knackJS = function () {
    return {
        /**
         * 获取文件后缀名
         * @memberOf _lib_knackJS
         * @param {string} fileName
         * @return {undefined|String}
         */
        getFileNameExtension: function (fileName) {
            if(!fileNameStr){
                return void 0;
            }
            var fileNameStr = fileName + '';
            return fileNameStr.slice((fileNameStr.lastIndexOf(".") - 1 >>> 0) + 2);
        },
        /**
         * 获取16进制颜色值
         * @memberOf _lib_knackJS
         * @param {boolean} widthPoundKey  默认为false，true时返回带有#建
         * @returns {string}
         */
         getHexadecimalColor: function (widthPoundKey) {
             return (widthPoundKey ? '#' : '') + Math.floor(Math.random() * (2 << 23)).toString(16);
         },
        /**
         * 格式化消息
         * @memberOf _lib_knackJS
         * @param {string} msg  消息
         * @returns {string}
         */
         log: function (msg) {
                console.log('%c%s%s%s', 'color: yellow; background-color: black;', '– ', msg, ' –');
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
        },
        /**
         *  生成指定区间的随机数
         * @memberOf _lib_numberJS
         * @param {number} min
         * @param {number} max
         * @return {*}
         */
        getRandomNumber: function (min, max) {
            switch(arguments.length){
                case 1:
                    return parseInt(Math.random()*min+1,10);
                    break;
                case 2:
                    return parseInt(Math.random()*(max-min+1)+min,10);
                    break;
                default:
                    return 0;
                    break;
            }
        },
        /**
         * 判断是否是质数
         * @memberOf _lib_numberJS
         * @param {number}x
         * @return {boolean}
         */
        isPrime:function(x) {
            return (!(/^,?$|^(,,+?)\1+$/.test(Array(++x))));
        },
        /**
         * 改进的向上取舍
         * @memberOf _lib_numberJS
         * @param {number}value
         * @param {number} n 小数点位数
         * @return {string}
         */
        toFiexd: function (value, n) {
            var _v = (value + 3e-16).toFixed(n);
            return ;
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

            for (var i = 0; i < arguments; i++) {
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
        objoct2string: function (object) {
            var r = [];
            if (typeof o == "string") {
                return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
            }
            if (typeof o == "object") {
                if (!o.sort) {
                    for (var i in o) {
                        r.push(i + ":" + obj2string(o[i]));
                    }
                    if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
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

/**
 * web工具类，可通过libJS.web 访问,依赖于jquery
 * @constructor _lib_webJS
 */
function _lib_webJS() {
    return {
        /**
         * jquery ajax 封装类
         * @memberOf _lib_webJS
         * @constructor ajax
         * @inner
         */
        ajax: {
            /**
             * 封装的post 方法
             * @memberOf ajax
             * @param {String} url
             * @param {Object} data
             * @param {Function} fn
             */
            post: function(url, data, fn) {

                var settings = {
                    "async": true,
                    "url": url ,
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json"
                    },
                    "data": JSON.stringify(data)
                };

                $.ajax(settings).done(function (response) {
                    fn(response);
                });
            }
        },
        /**
         *
         *根据参数名获取url中的参数值
         * @memberOf _lib_webJS
         * @param {String} paramName
         * @returns {null}
         */
        getQueryString: function(paramName) {
            var reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
            var r = decodeURI(window.location).search.substr(1).match(reg);
            if(r!=null)return  r[2]; return null;
        }
    }
}
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
