var gulp = require('gulp'),
    watch = require('gulp-watch');
    path = require('path');
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

//lint
gulp.task('lint', function() {
  return gulp.src('./**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//build

