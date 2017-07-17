/**
 * Created by yanyj on 2017/7/6.
 */
var gulp = require('gulp');
var concat  = require('gulp-concat');
var order = require('gulp-order');
var uglify  = require('gulp-uglify');
var clean = require('gulp-clean');
var jsdoc = require('gulp-jsdoc3');

var config = require('./jsodc.json');




gulp.task('clean',function(){

    gulp.src(['dist/*', 'out/*'],{read:false})
        .pipe(clean());
});

var fileArray = [
    "src/libJS/libJS.header",
    "src/lib_*/*.js",
    "src/libJS/libJS.tail",


];

//合并
gulp.task("contact",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    gulp.src(fileArray)
        .pipe(order(fileArray,{ base: './' }))
        .pipe(concat('libJS.js')).pipe(gulp.dest('./dist'));
});

//压缩
gulp.task("uglify",function(){
    // 把1.js和2.js合并压缩为main.js，输出到dest/js目录下
    gulp.src(fileArray)
        .pipe(order(fileArray,{ base: './' }))
        .pipe(concat('libJS.min.js')).pipe(uglify()).pipe(gulp.dest('./dist'));
});


gulp.task('generate', function(){

    return gulp.src(['./src/libJS.js',"./src/lib_*/*.js"])
        .pipe(jsdoc(config))
});

gulp.task('minify', ['clean', 'contact', 'uglify', 'generate']);



gulp.task('watch', function(){
    gulp.watch('./src/lib_*/*.js', ['minify']);
});

//压缩
gulp.task("minify-test",function(){
    // 把1.js和2.js合并压缩为main.js，输出到dest/js目录下
    gulp.src('./minfy/socket.io.js')

        .pipe(uglify()).pipe(gulp.dest('./dist'));
});



