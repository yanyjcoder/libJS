/**
 * Created by yanyj on 2017/7/6.
 */
var gulp = require('gulp');
var concat  = require('gulp-concat');
var order = require('gulp-order');
var uglify  = require('gulp-uglify');

//合并
gulp.task("contact",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    gulp.src(['src/libJS.js', 'src/lib_*/*.js'])
        .pipe(order([
            "src/libJS.js",
            "src/lib_*/*.js"
        ]))
        .pipe(concat('libJS.js')).pipe(gulp.dest('./dist'));
});

//压缩
gulp.task("uglify",function(){
    // 把1.js和2.js合并压缩为main.js，输出到dest/js目录下
    gulp.src(['src/libJS.js', 'src/lib_*/*.js'])
        .pipe(order([
            "src/libJS.js",
            "src/lib_*/*.js"
        ]))
        .pipe(concat('libJS-min.js')).pipe(uglify()).pipe(gulp.dest('./dist'));
});

gulp.task('minify', ['contact', 'uglify']);