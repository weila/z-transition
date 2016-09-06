var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('minifyjs', function() {
    return gulp.src('js/*.js')
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('js/min'));  //输出
});

gulp.task('clean', function(cb) {
    del('js/min', cb)
});