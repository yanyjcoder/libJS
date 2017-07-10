//性能测试工具类

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;


module.exports = {
    /**
     *
     * @param testNameArray 测试方法名
     * @param function1 待测试方法1
     * @param function2 待测试方法2
     */
    performance: function(testNameArray, function1, function2) {

        // 添加测试
        suite.add(testNameArray[0], function1)
            .add(testNameArray[1], function2)
            // add listeners
            .on('cycle', function(event) {
                console.log(String(event.target));
            })
            .on('complete', function() {
                console.log('Fastest is ' + this.filter('fastest').map('name'));
            })
            // run async
            .run({ 'async': true });

     }
};