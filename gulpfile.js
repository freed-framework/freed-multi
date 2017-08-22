/**
 * @file gulpfile.js
 * @author lihuanji
 *
 * gulp配置 发布前执行
 */

const gulp = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const minifyCss = require('gulp-minify-css');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('clean', () =>
    gulp.src(['./lib'], {read: false})
        .pipe(clean())
);

gulp.task('babel', ['clean'], () =>
    gulp.src([
        './src/**/*.jsx',
        './src/**/*.js',
    ])
        .pipe(babel({
            presets: ['react', 'es2015', 'stage-0'],
            plugins: ['transform-runtime', 'transform-decorators-legacy']
        }))
        .pipe(gulp.dest('./lib'))
);

gulp.task('styles', () => {
    gulp.src([
        './style/**/*.css',
        './style/**/*.scss'
    ])
        .pipe(sass())
        .pipe(concat('build.css'))
        .pipe(gulp.dest('./common/css'))
        .pipe(minifyCss())
        .pipe(concat('common.min.css'))
        .pipe(gulp.dest('./common/css'));
});

gulp.task('move', ['clean'], () =>
    gulp.src([
        './src/**/*.scss',
        './src/**/*.css',
        './src/**/*.png',
        './src/**/*.eot',
        './src/**/*.svg',
        './src/**/*.ttf',
        './src/**/*.woff',
        './src/**/*.json',
    ])
        .pipe(gulp.dest('./lib'))
);

gulp.task('default', ['babel', 'styles', 'move']);
