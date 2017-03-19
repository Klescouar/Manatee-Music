const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const rename = require("gulp-rename");
const gulpCopy = require('gulp-copy');
const inject = require('gulp-inject');
const browserSync = require("browser-sync").create();

gulp.task('sass', function () {
  return gulp.src('src/app/scss/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist/app/css'));
});

/**
 *
 * BrowserSync.io
 * - Watch CSS, JS & HTML for changes
 * - View project at: localhost:3000
 *
 **/
 gulp.task('browser-sync', function() {
     browserSync.init([
         'dist/**/css/*.css', 'dist/**/*.js', 'src/**.html'
     ], {
         server: {
             baseDir: './dist'
         }
     });
 });

gulp.task('copy', function() {
    gulp.src('src/app/index.html').pipe(gulp.dest('dist/app'));
    gulp.src('src/assets/images/*').pipe(gulp.dest('dist/assets/images'));
    gulp.src('src/app/views/**/*.html').pipe(gulp.dest('dist/app/views'));
    gulp.src('src/assets/lib/**/*').pipe(gulp.dest('dist/assets/lib'));
    gulp.src('src/app/js/**/*.js').pipe(gulp.dest('dist/app/js'));
    gulp.src('src/app/*.js').pipe(gulp.dest('dist/app/'));
    gulp.src('src/app/*.html').pipe(gulp.dest('dist/app/'));
});

gulp.task('default', [
    'sass', 'copy', 'browser-sync'
], function() {
    gulp.watch('src/app/scss/*.scss', ['sass']);
    gulp.watch('src/app/index.html', ['copy']);
    gulp.watch('src/app/views/**/*.html', ['copy']);
    gulp.watch('src/app/js/**/*.js', ['copy']);
    gulp.watch('src/app/*.js', ['copy']);
    gulp.watch('src/app/*.html', ['copy']);
});
