var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('server', function () {
    return nodemon({
        script: './bin/www',
        env: {DEBUG: 'vagrant:*'}
    });
});

gulp.task('default', ['server']);