var gulp = require('gulp'),
    connect = require('gulp-connect'),
    del = require('del'),
    gulpIgnore = require('gulp-ignore'),
    historyApiFallback = require('connect-history-api-fallback'),
    sass = require('gulp-sass'),
    less = require('gulp-less');

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

gulp.task('build', [ 'bower-files', 'content', 'css', 'connect', 'watch']);

gulp.task('bower-files', function() {
    gulp.src('bower_components/**/*.*', { base: 'bower_components' })
        .pipe(gulpIgnore.exclude("*.map"))
        .pipe(gulp.dest('dist/lib'));
});

gulp.task('css', function () {
    gulp.src('src/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/styles'));

    gulp.src('src/styles/openmind.less')
        .pipe(less())
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('content', function() {
    gulp.src([
            'src/**/*.html',
            'src/images/**/*.*'
        ], {
            base: 'src'
        })
        .pipe(gulp.dest('dist'));

    gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 9700
    });
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.html'], ['html', 'reload']);
    gulp.watch(['src/**/*.js'], ['js', 'reload']);
    gulp.watch(['src/styles/**/*.*'], ['css', 'reload']);
});

gulp.task('clean', function(cb) {
    del('dist', cb);
});

gulp.task('reload', function() {
    connect.reload();
});