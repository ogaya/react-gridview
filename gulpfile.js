var gulp = require("gulp");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");
var webpackSampleConfig = require("./webpack-sample.config.js");

//var requireDir = require("require-dir");
var uglify = require("gulp-uglify");

gulp.task("cleanBuild", function(cb) {
  var rimraf = require("rimraf");
  rimraf("./dist/*", cb);
});

gulp.task("build", ["cleanBuild"], function() {
  return gulp.src("")
  .pipe(webpack(webpackConfig))
  .pipe(uglify())
  .pipe(gulp.dest(""));

});

gulp.task("debug", ["cleanBuild"], function() {
  return gulp.src("")
  .pipe(webpack(webpackConfig))
  .pipe(gulp.dest(""));
});

gulp.task("watch", function() {
  gulp.watch("./src/**", ["sample"]);
});

gulp.task("sample", function() {
  return gulp.src("")
  .pipe(webpack(webpackSampleConfig))
  .pipe(gulp.dest(""));
});
