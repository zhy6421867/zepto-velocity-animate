var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var server = require('gulp-server-livereload');
//var webpack = require('gulp-webpack');
var base64 = require('gulp-base64');
var uglify = require('gulp-uglify');

var paths = {
	sass: ['./css/*.scss'],
	js: ['./js/*.js']
};

gulp.task('default', ['watch', 'webserver']);

gulp.task('sass', function(done) {
	gulp.src('./css/*.scss')
		.pipe(sass())
		.on('error', sass.logError)
        //.pipe(base64())
		.pipe(gulp.dest('./css/'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('./dist/'))
		.on('end', done);
});

gulp.task('compress', function() {
	gulp.src('js/index.js')
		.pipe(uglify({
			mangle: true		//不混淆变量名
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.js, ['compress']);
});

gulp.task('webserver', function() {
	gulp.src('')
		.pipe(server({
			livereload: true,
			directoryListing: true,
			//defaultFile: 'product.html',
			open: true
		}));
});

/*gulp.task('webpack', function() {
	return gulp.src('js/app.js')
		.pipe(webpack({
			output: {
				filename: 'bundle.js',
			},
		}))
		.pipe(gulp.dest('dist/'));
});*/