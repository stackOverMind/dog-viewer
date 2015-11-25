var gulp = require('gulp'),
    watch = require('gulp-watch');
    path = require('path');
    uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var spa         = require("browser-sync-spa");
var jshint = require('gulp-jshint');
gulp.task('watch', function () {
    watch(['bower_components/**/*.js',
        'bower_components/**/*.css',
        './src/**/*.js',
        './assets/**/*.*',
        './index.html'
        ],function(event){
            browserSync.reload(event.path)
    });
});

gulp.task('serve',['watch'],function(){
    browserSync.init({
        startPath:'/',
        server:{
            baseDir:"./",
            routes:{
                '/bower_components':'bower_components'
            }
        }

    });    
})

gulp.task('js',function(){
    return gulp.src('src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));

})
gulp.task('assets',function(){
    return gulp.src('assets/**/*.*')
    .pipe(gulp.dest('dist/assets'));

})
gulp.task('build',['js','assets']);

//lint
gulp.task('lint', function() {
  return gulp.src('./**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//build

