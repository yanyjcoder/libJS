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
