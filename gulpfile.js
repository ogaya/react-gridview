var gulp = require("gulp");
var exec = require('child_process').exec;
var istanbul = require("gulp-istanbul");
var mocha = require('gulp-mocha');
var replace = require("gulp-replace");

gulp.task("build:clean", function (cb) {
    var rimraf = require("rimraf");
    rimraf("./dist/*", function () {
        rimraf("./tmp/*", cb);
    });
});

gulp.task("build", ["build:clean"], function (cb) {
    exec("tsc -p ./", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task("decoration", ["build"], function (cb) {
    exec("tsc -d -p ./", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


gulp.task("release:copy", ["decoration"], function () {
    gulp.src(['./tmp/src/**', "!./tmp/src/**/*.d.ts"])
        .pipe(gulp.dest('./dist'));
});

gulp.task('release', ["release:copy"], function () {
    
    gulp.src(['./tmp/src/**/*.d.ts'])
        .pipe(replace('extends  {', '{'))
        .pipe(gulp.dest('./dist'));
});

gulp.task("mapping", ["build"], function (cb) {
    exec("tsc --sourceMap -p ./", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task("test:pre", ["mapping"], function () {
    return gulp.src(['./tmp/src/**/*.js'])
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task("test:run", ["test:pre"], function () {
    return gulp.src('./tmp/test/**/*.js')
        .pipe(mocha({}))
        .pipe(istanbul.writeReports());
});

gulp.task("coverage-html", ["test:run"], function (cb) {
    exec("cd coverage && remap-istanbul -i coverage-final.json -o html-report -t html ", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

gulp.task("test", ["coverage-html"], function (cb) {
    exec("cd coverage && remap-istanbul -i coverage-final.json -o lcov-remapped.info -t lcovonly", function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// "cat coverage/lcov.info | coveralls"
 