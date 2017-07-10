/**
 * Created by yanyj on 2017/7/10.
 */
var libJS = require('../dist/libJS');
var Performance = require('../lib/performance.test');
var a = {
    a:123,
    b: "123",
    c: ["12"],
    c1: ["12"],
    c2: ["12"],
    c3: ["12"],
    c4: ["12"],
    // c5: ["12"],
    // c6: ["12"],
    // c7: ["12"],
    // c8: ["12"],
    // c9: ["12"],
    // c10: ["12"],
    d: {
        a:1
    }
};

var b = {
    a:123,
    b: "123",
    c: ["12"],
    c1: ["12"],
    c2: ["12"],
    c3: ["12"],
    c4: ["12"],
    c5: ["12"],
    c6: ["12"],
    // c7: ["12"],
    // c8: ["12"],
    // c9: ["12"],
    // c10: ["12"],
    d: {
        a:1
    }
};

console.log(libJS.object.isEqual(a, b));

//libJS.object.isEqual方法与 toJSON比较性能

function isJsonEqual(o1, o2) {
    var o1JSon = JSON.stringify(o1);
    var o2JSon = JSON.stringify(o2);

    return o1JSon === o2JSon;
}

Performance.performance(['object#isEqual','JSON.stringify'], function () {
    libJS.object.isEqual(this, this);
}, function () {
    isJsonEqual(this, this);
});

