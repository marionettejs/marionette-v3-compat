import gulp from 'gulp';
import mocha from 'gulp-mocha';
import runSequence from 'run-sequence';

const mochaGlobals = ['stub', 'spy', 'expect', 'Mn'];

function _registerBabel() {
  require('babel-register');
}

function _mocha(setupFile) {
  return gulp.src(
    [setupFile, 'test/unit/**/*.js'],
      {read: false}
    )
    .pipe(mocha({
      reporter: 'dot',
      globals: mochaGlobals,
      ignoreLeaks: false
    }));
}

function test() {
  _registerBabel();
  return _mocha('test/setup/node.js');
}

gulp.task('test', test);
