import gulp from 'gulp';
import plumber from 'gulp-plumber';
import file from 'gulp-file';
import filter from 'gulp-filter';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import preset from 'babel-preset-es2015-rollup';

import {name} from '../package.json';

const srcPath = 'src/';
const buildPath = 'lib/';

gulp.task('build', ['lint-src'], function() {
  return rollup({
    entry: srcPath + name + '.js',
    external: ['underscore', 'backbone', 'backbone.marionette'],
    plugins: [
      json(),
      babel({
        sourceMaps: true,
        presets: [preset],
        babelrc: false
      })
    ]
  }).then(bundle => {
    return bundle.generate({
      format: 'umd',
      sourceMap: true,
      globals: {
        'marionette': 'Marionette',
        'backbone': 'Backbone',
        'underscore': '_'
      }
    });
  }).then(gen => {
    gen.code += '\n//# sourceMappingURL=' + gen.map.toUrl();
    return gen;
  }).then(gen => {
    return file(name + '.js', gen.code, {src: true})
      .pipe(plumber())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildPath))
      .pipe(filter(['*', '!**/*.js.map']))
      .pipe(rename(name + '.min.js'))
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify({
        preserveComments: 'license'
      }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(buildPath));
  });
});

