import gulp from 'gulp';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import util from 'gulp-util';

function onError() {
  util.beep();
}

gulp.task('lint-src', function() {
  return gulp.src(['src/**/*.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .on('error', onError);
});
