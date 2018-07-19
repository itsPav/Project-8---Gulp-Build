'use strict';

var   gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      maps = require('gulp-sourcemaps'),
  imagemin = require('gulp-imagemin'),
     clean = require('gulp-clean'),
 uglifycss = require('gulp-uglifycss');

gulp.task('jsMaps', function() {
    return gulp.src(['js/global.js', 'js/circle/autogrow.js', 'js/circle/circle.js'])
            .pipe(maps.init())
            .pipe(concat('all.js'))
            .pipe(maps.write('./'))
            .pipe(gulp.dest('dist/scripts'));
});

gulp.task('scripts', ['jsMaps'], function () {
    return gulp.src('dist/scripts/all.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/scripts'));
})

gulp.task('compileSass', function() {
    return gulp.src(['sass/global.scss'])
            .pipe(maps.init())
            .pipe(sass())
            .pipe(maps.write('./'))
            .pipe(gulp.dest('dist/styles'));
});

gulp.task('styles', ['compileSass'], function() {
    gulp.src('dist/styles/global.css')
        .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
        }))
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'));
})

gulp.task('images', function() {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
})

gulp.task('clean', function() {
    return gulp.src('dist/*', {read: false})
        .pipe(clean());
})

gulp.task('watchSass', function() {
    
})

gulp.task('build', ['clean', 'scripts', 'styles', 'images']);

gulp.task('default', ['build'])