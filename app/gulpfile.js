var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var buffer = require('gulp-buffer');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var url = require('url');
var proxy = require('proxy-middleware');
var del = require('del');
var flatten = require('gulp-flatten');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

var SRC_FOLDER = './src';
var SRC_APP_FOLDER = SRC_FOLDER + '/app';
var SRC_ASSETS_FOLDER = SRC_FOLDER + '/assets';

var PUBLIC_FOLDER = './public';
var PUBLIC_ASSETS_FOLDER = PUBLIC_FOLDER + '/assets';

function cleanBuild() {
    return del.sync([PUBLIC_FOLDER + '/**/*.*']);
}

function copyImages() {
    return gulp
        .src(SRC_ASSETS_FOLDER + '/img/*.*')
        .pipe(gulp.dest(PUBLIC_ASSETS_FOLDER + '/img/'));
}

function copyFonts() {
    return gulp
        .src(SRC_ASSETS_FOLDER + '/fonts/*.*')
        .pipe(gulp.dest(PUBLIC_ASSETS_FOLDER + '/fonts/'));
}

function copyMergeJS() {
    return gulp
        .src(SRC_ASSETS_FOLDER + '/js/*.*')
        .pipe(concat('libs.js'))
        .pipe(gulp.dest(PUBLIC_ASSETS_FOLDER + '/js/'));
}

function copyMergeCSS() {
    return gulp
        .src([SRC_ASSETS_FOLDER + '/css/reset.css', SRC_ASSETS_FOLDER + '/css/*.*'])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest(PUBLIC_ASSETS_FOLDER + '/css/'));
}

function copyIndex() {
    return gulp
        .src([SRC_FOLDER + '/index.html'])
        .pipe(gulp.dest(PUBLIC_FOLDER));
}

function copyHTMLTemplates() {
    return gulp
        .src([SRC_APP_FOLDER + '/**/*.html'])
        .pipe(flatten())
        .pipe(gulp.dest(PUBLIC_ASSETS_FOLDER + '/templates'));
}

function sassToCSS() {
  return gulp
        .src([SRC_APP_FOLDER + '/**/*.sass'])
        .pipe(concat('app.sass'))
        .pipe(sass().on('error', sass.logError))
        .pipe(minify())
        .pipe(gulp.dest(PUBLIC_ASSETS_FOLDER + "/css/"));
}

function build() {
    return browserify({
            entries: SRC_APP_FOLDER + '/app.js', 
            extensions: ['.js'], 
            paths: ['./node_modules','./src/app/domain/', './src/app/']
        })
        .transform(babelify.configure({
            "presets": ["es2015"]
        }))
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(PUBLIC_ASSETS_FOLDER + "/js/"));
}

function syncBrowser() {
    var proxyOptions = url.parse('http://localhost:3000/');
    proxyOptions.route = '/';
    proxyOptions.ws = true;

    browserSync.init({
        open: false,
        server: {
            baseDir: PUBLIC_FOLDER,
            routes: {
                '/node_modules': 'node_modules'
            }
        },
        browser: 'chrome',
        port: 3010,
        middleware: [proxy(proxyOptions)]
    });
}

function reloadBrowserOnFileChanges() {
    gulp.watch(SRC_FOLDER + '/**/*.*', ['build']);
    gulp.watch(PUBLIC_FOLDER + '/**/*.*').on('change', browserSync.reload);
}

gulp.task('clean', cleanBuild);
gulp.task('copyImages', copyImages);
gulp.task('copyFonts', copyFonts);
gulp.task('copyMergeJS', copyMergeJS);
gulp.task('copyMergeCSS', copyMergeCSS);
gulp.task('copyIndex', copyIndex);
gulp.task('copyHTMLTemplates', copyHTMLTemplates);
gulp.task('sassToCSS', sassToCSS);

gulp.task('build', ['sassToCSS', 'copyIndex', 'copyHTMLTemplates', 'copyImages', 'copyFonts', 'copyMergeJS', 'copyMergeCSS'], build);
gulp.task('browser-sync', ['clean', 'build'], syncBrowser);
gulp.task('dev', ['browser-sync'], reloadBrowserOnFileChanges);