var gulp = require("gulp");
var webpack = require("gulp-webpack");
var webpackConfig = require("./webpack.config.js");
//var webpackSampleConfig = require("./webpack-sample.config.js");

//var requireDir = require("require-dir");
var uglify = require("gulp-uglify");

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
    return gulp.src("./src/index.html")
        .pipe(gulp.dest("./dist"));
});
