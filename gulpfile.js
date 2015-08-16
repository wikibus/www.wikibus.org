var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});

gulp.task('build', [ 'bower-files', 'html', 'connect', 'watch']);

gulp.task('bower-files', function() {
    gulp.src('bower_components/**/*.*', { base: 'bower_components' })
        .pipe(gulpIgnore.exclude("*.map"))
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 9700,
        middleware: function(connect, opt) {
            return [
                historyApiFallback
            ];
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.html'], ['html', 'reload']);
    gulp.watch(['src/**/*.js'], ['js', 'reload']);
    gulp.watch(['src/**/*.css'], ['css', 'reload']);
});

gulp.task('clean', function(cb) {
    del('dist', cb);
});