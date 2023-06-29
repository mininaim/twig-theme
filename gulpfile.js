var gulp = require('gulp');
//var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var order = require('gulp-order');
var rename = require('gulp-rename');

gulp.task('js', function () {
  return gulp
    .src('assets/*.js')
    .pipe(
      order([
        // Order of js files to be concatenated
      ]),
    )
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('assets/'));
});
