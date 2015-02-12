var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var watchify = require('watchify');
var assign = require('object-assign');
var to5ify = require('6to5ify');
var colors = require('colors');
var fs = require('fs');
var mkdirp = require('mkdirp');
var _ = require('lodash');

var root = __dirname;


gulp.task('js:build', buildJS);
gulp.task('js:watch', watchJS);
gulp.task('server', runServer);
gulp.task('default', ['server', 'js:watch']);

function runServer() {
    return nodemon({
        script: './bin/www',
        ignore: [ './public/**', './client/**' ],
        env: {DEBUG: 'vagrant:*'}
    });
}


// BROWSERIFY

function watchJS(){
    var bundler = watchify(buildBundler(true));
    var build = _.partial(rebundle, bundler);

    bundler.on('update', build);

    return build();
}

function buildJS(){
    var bundler = buildBundler();
    return rebundle(bundler);
}

function buildBundler(debug) {
    var args = assign(watchify.args, {debug: debug});
    var entry = root + '/client/index.js';
    var src = root + '/client';

    return browserify(args)
        .transform(to5ify.configure({
            ignore: /node_modules/,
            sourceMapRelative: src
        }))
        .require(entry, {entry: true});
}

function rebundle(bundler) {
    var startTime = new Date().getTime();
    var outDir = root + '/public/javascripts';
    var output = outDir + '/app.js';

    return bundler.
        bundle(function (err, main) {
            mkdirp(outDir, function(){ fs.writeFile(output, main) });
        }).
        on('error', logArgs).
        on('end', function () {
            var time = (new Date().getTime() - startTime) / 1000;
            console.log(output.cyan + " was browserified: " + (time + 's').magenta);
        });
}

function logArgs(){
  console.log(arguments);
}


