var gulp = require("gulp");
var webpack = require("gulp-webpack");
var webpackSampleConfig = require("./webpack-sample.config.js");

var exec = require('child_process').exec;
var uglify = require("gulp-uglify");

var istanbul = require("gulp-istanbul");

var mocha = require('gulp-mocha');
var babel = require('gulp-babel');

var replace = require("gulp-replace");

gulp.task("cleanBuild", function (cb) {
    var rimraf = require("rimraf");
    rimraf("./dist/*", cb);
});

gulp.task("decoration", ["build"], function (cb) {
    exec("tsc -d -p ./", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task('release', ["decoration"], function(){
  gulp.src(['./dist/**/*.d.ts'])
    .pipe(replace('extends  {', '{'))
    .pipe(gulp.dest('./dist'));
});

gulp.task("build", ["cleanBuild"], function (cb) {
    exec("tsc -p ./", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task("sample", ["build"], function () {
    return gulp.src("")
        .pipe(webpack(webpackSampleConfig))
        .pipe(gulp.dest(""));
});
gulp.task("pre-test", function () {
    return gulp.src(['./dist/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ["pre-test"],function () {
    return gulp.src('./test/**/*.js')
        .pipe(mocha({}))
        .pipe(istanbul.writeReports());
});

