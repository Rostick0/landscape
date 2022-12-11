const { src, dest, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const { init, watch, reload } = require('browser-sync').create();

function html() {
    return src('app/pages/**')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('dist'))
}

function scss() {
    return src('app/source/scss/style.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(csso())
        .pipe(dest('dist/css'))
}

function js() {
    return src(['app/js/UI.js', 'app/js/transition.js'])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(dest('dist/js'))
}

function img() {
    return src('app/img/**')
        .pipe(dest('dist/img'))
}

function font() {
    return src('app/font/**')
        .pipe(dest('dist/font'))
}

function serve() {
    init({
        server: './dist'
    })

    watch('app/pages/**.html', series(html)).on('change', reload);
    watch('app/layout/**.html', series(html)).on('change', reload);
    watch('app/components/**.html', series(html)).on('change', reload);
    watch('app/source/scss/**', series(scss)).on('change', reload);
    watch('app/js/**', series(js)).on('change', reload);
    watch('app/img/**', series(img)).on('change', reload);
}

exports.serve = series(html, scss, js, img, font, serve);