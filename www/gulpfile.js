var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var sass = require('gulp-sass');
var webpack = require("webpack");
var watch = require('gulp-watch');
var gulpWebpack = require('webpack-stream');
var Promise = require('promise');



gulp.task('css', () => {
	return gulp.src('src/css/*.scss')
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('webpack', () => {
	return new Promise((resolve) => {
		webpack(require('./webpack.config.js'), resolve);
	});
});

gulp.task('watch', () => {
	watch('src/css/**/*.scss',{ ignoreInitial: false }, () =>{
		gulp.start('css');
	});

	watch(['webpack.config.js', 'src/js/**/*.jsx'],{ ignoreInitial: false }, () =>{
		gulp.start('webpack');
	});
	return new Promise(() => {});
});

gulp.task('default', ['css','webpack']);