'use strict';

// declaring all modules used
var   gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    uglifycss = require('gulp-uglifycss'),
    browserSync = require('browser-sync').create();

// gulp task to concat js files and create source map
gulp.task('jsMaps', function() {
    return gulp.src(['js/global.js', 'js/circle/autogrow.js', 'js/circle/circle.js'])
            .pipe(maps.init())
            .pipe(concat('all.js'))
            .pipe(maps.write('./'))
            .pipe(gulp.dest('dist/scripts'));
});

// gulp task to minify the concat js file
gulp.task('scripts', ['jsMaps'], function () {
    return gulp.src('dist/scripts/all.js')
        .pipe(uglify())
        .pipe(rename('all.min.js'))
        .pipe(gulp.dest('dist/scripts'));
})

// gulp task to compile sass into 1 file and create a source map
gulp.task('compileSass', function() {
    return gulp.src(['sass/global.scss'])
            .pipe(maps.init())
            .pipe(sass())
            .pipe(maps.write('./'))
            .pipe(gulp.dest('dist/styles'));
});

// gulp task to minify sass
gulp.task('styles', ['compileSass'], function() {
    gulp.src('dist/styles/global.css')
        .pipe(uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
        }))
        .pipe(rename('all.min.css'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
})

// gulp task to minimize image file size
gulp.task('images', function() {
    return gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/content'));
})

// do gulp clean sync
gulp.task('clean', function() {
    del.sync('dist');
})

// launch static server and watch for changes in sass folder
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("sass/*.scss", ['styles']);
});

gulp.task('build', ['clean', 'scripts', 'styles', 'images', 'browser-sync']);

gulp.task('default', ['build'])