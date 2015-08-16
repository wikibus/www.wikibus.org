var gulp = require('gulp'),
    connect = require('gulp-connect'),
    del = require('del'),
    gulpIgnore = require('gulp-ignore'),
    history = require('connect-history-api-fallback'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint');

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

gulp.task('build', [ 'bower-files', 'content', 'lint', 'css', 'connect', 'watch']);

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

gulp.task('lint', function() {
    gulp.src('src/components/**/*.html')
        // if flag is not defined default value is 'auto'
        .pipe(jshint.extract('auto'))
        .pipe(jshint({
            newcap: false,
            globalstrict: true
        }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 9700,
        middleware: function(connect, opt) {
            return [
                history({
                    verbose: false
                })
            ];
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.html'], ['content', 'lint', 'reload']);
    gulp.watch(['src/**/*.js'], ['js', 'lint', 'reload']);
    gulp.watch(['src/styles/**/*.*'], ['css', 'reload']);
});

gulp.task('clean', function(cb) {
    del('dist', cb);
});

gulp.task('reload', function() {
    connect.reload();
});