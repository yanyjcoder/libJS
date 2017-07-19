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
        }
    }
}