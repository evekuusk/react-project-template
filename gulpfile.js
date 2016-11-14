'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    minify = require('gulp-minify'),
    rename = require('gulp-rename'),
    cleanCSS = require('gulp-clean-css'),
    del = require('del');

gulp.task("minifyCSS", function() {
  return gulp.src([
    'css/styles.css'
  ])
  .pipe(cleanCSS())
  .pipe(rename(function (path) {
    path.basename = "Styles.min";
  }))
  .pipe(gulp.dest('css'));
})

gulp.task('compileJS', function() {
  return gulp.src([
    'js/vendor/jquery.js',
    'js/vendor/react.min.js',
    'js/vendor/react-dom.min.js',
    'js/components/**/**',
    'js/helpers/**/**',
    'js/main.js'
  ])
  .pipe(concat('App.js'))
  .pipe(babel())
  .pipe(minify())
  .pipe(rename('App.min.js'))
  .pipe(gulp.dest('js'));
})

gulp.task('clean', function() {
  del('public');
})

gulp.task('build', ['compileJS', 'minifyCSS'], function() {
  return gulp.src([
    'css/Styles.min.css',
    'js/App.min.js',
    'data/**',
    'media/**/**',
    '*.html'
  ], {base: './'})
  .pipe(gulp.dest('public'));
})

gulp.task('default', ['clean', 'build'], function() {
})
