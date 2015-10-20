var gulp = require("gulp");
var webpack = require("gulp-webpack");
//var webpackConfig = require("./webpack.config.js");
var webpackSampleConfig = require("./webpack-sample.config.js");

//var requireDir = require("require-dir");
var uglify = require("gulp-uglify");

var mocha = require('gulp-mocha');
//var gutil = require('gulp-util');
var babel = require('gulp-babel');
var espower = require('gulp-espower');

gulp.task("cleanBuild", function(cb) {
  var rimraf = require("rimraf");
  rimraf("./dist/*", cb);
});

//gulp.task("build", ["cleanBuild"], function() {
//  return gulp.src("")
//  .pipe(webpack(webpackConfig))
//  .pipe(uglify())
//  .pipe(gulp.dest(""));
//});

//gulp.task("debug", ["cleanBuild"], function() {
//  return gulp.src("")
//  .pipe(webpack(webpackConfig))
//  .pipe(gulp.dest(""));
//});


gulp.task("build", ["cleanBuild"], function() {
  return gulp.src('./src/**')
    .pipe(babel())
    .pipe(gulp.dest("./dist"));
});


gulp.task("watch", function() {
  gulp.watch("./src/**", ["sample"]);
});


gulp.task("auto", function() {
  gulp.watch("./sample/**", ["sample"]);
});

gulp.task("sample", ["build", "mocha"], function() {
  return gulp.src("")
  .pipe(webpack(webpackSampleConfig))
  .pipe(uglify())
  .pipe(gulp.dest(""));
});

gulp.task('mocha', function() {
  require('babel/register');
  //require('intelli-espower-loader');

  //return gulp.src(['./test/model/*.js'], { read: false })
  return gulp.src('./test/**/*.js')
    .pipe(babel())
    .pipe(espower())
    .pipe(mocha({}));
    //.pipe(mocha({ reporter: 'list'}));
    //.on('error', gutil.log);
});

gulp.task('test', function() {
  gulp.watch("./test/**/*.js", ["mocha"]);
});
