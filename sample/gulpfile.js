var gulp = require("gulp");
var webpack = require("gulp-webpack");
//var webpackConfig = require("./webpack.config.js");
var webpackConfig = require("./webpack.config.js");

//var requireDir = require("require-dir");
var uglify = require("gulp-uglify");

//var mocha = require('gulp-mocha');
//var gutil = require('gulp-util');
//var babel = require('gulp-babel');
//var espower = require('gulp-espower');

gulp.task("cleanBuild", function (cb) {
    var rimraf = require("rimraf");
    rimraf("./dist/*", cb);
});

gulp.task("pack", ["cleanBuild"], function () {
    return gulp.src("")
        .pipe(webpack(webpackConfig))
        .pipe(uglify())
        .pipe(gulp.dest(""));
});

gulp.task("build", ["pack"], function () {
    return gulp.src("./src/sample.html")
        .pipe(gulp.dest("./dist"));
});
// gulp.task("build", ["cleanBuild"], function() {
//   return gulp.src('./src/**')
//     .pipe(babel())
//     .pipe(gulp.dest("./dist"));
// });


// gulp.task("watch", function() {
//   gulp.watch("./src/**", ["sample"]);
// });


// gulp.task("auto", function() {
//   gulp.watch("./sample/**", ["sample"]);
// });
