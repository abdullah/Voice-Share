var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify');


gulp.task('less', function () {
    return gulp.src('./public/stylesheets/less/main.less')
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/stylesheets/css'));
});


gulp.task('watch', function () {
    gulp.watch('./public/stylesheets/less/**/*.less', ['less']);

    gulp.watch("./views/**/*.hbs").on('change', browserSync.reload);
});


gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;
    return nodemon({
        script: './bin/www'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true;
        }
    });
});


gulp.task('default', ['less', 'watch','browser-sync']);