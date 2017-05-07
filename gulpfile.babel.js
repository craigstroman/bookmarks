const browserSync = require('browser-sync');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const notify = require('gulp-notify');
const plumber  = require('gulp-plumber');
const path = require('path');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');

const reload = () => browserSync.reload();
const root = 'src';

// helper method for resolving paths
const resolveToApp = (glob) => {
  glob = glob || '';
  return path.join(root, 'app', glob); // app/{glob}
};

// map of all paths
const paths = {
  js: resolveToApp('**/*!(.spec.js).js'), // exclude spec files
  styl: './src/assets/css/scss/**/*.scss', // stylesheets
  html: [
    resolveToApp('**/*.html'),
    path.join(root, 'index.html')
  ],
  entry: path.join(root, 'app/app.js'),
  output: root
};

gulp.task('scss', () => {
  return gulp.src('./src/assets/css/scss/**/*.scss')
    .pipe(sass())
    .pipe(sourceMaps.init())
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./src/assets/css'));
});

gulp.task('lint', () => {
  return gulp.src(['./src/app/**/*.js', '!node_modules/**', '!./src/app/**/*.spec.js'])
    .pipe(plumber({
        handleError: function (err) {
            console.log(err);
            this.emit('end');
        }
    }))
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', notify.onError('Error!'))
    .pipe(eslint.failAfterError());
});

gulp.task('webpack', ['lint'], () => {
  return gulp.src(paths.entry)
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest(paths.output));
});

gulp.task('reload', ['webpack'], (done) => {
  reload();
  done();
});

gulp.task('serve', () => {
  browserSync({
    port: process.env.PORT || 3000,
    open: false,
    server: { baseDir: root }
  });
});

gulp.task('watch', () => {
  gulp.watch(['./src/assets/css/scss/**/*.scss'], ['scss']);
  gulp.watch(['./src/app/**/*.html'], ['webpack']);
  gulp.watch(['./src/app/**/*.js', '!./src/app/**/*.spec.js', '!./src/app/**/*.html'], ['lint', 'webpack']);
  gulp.watch(['./src/app/**/*.js', '!./src/app/**/*.spec.js', './src/app/assets/css/scss/**/*.scss'], ['reload']);
});

gulp.task('default', ['watch']);
gulp.task('server', ['serve']);
