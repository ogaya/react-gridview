var gulp = require("gulp");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");
//var webpackSampleConfig = require("./webpack-sample.config.js");

//var requireDir = require("require-dir");
var uglify = require("gulp-uglify");


gulp.task("docs", function() {
  return gulp.src("")
  .pipe(webpack(webpackConfig))
  .pipe(uglify())
  .pipe(gulp.dest(""));
});

gulp.task("watch", function() {
  gulp.watch("./src/**", ["docs"]);
});
