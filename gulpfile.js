

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('test', function(){
  gulp.src('./test/server.spec.js')
  .pipe(mocha().on('error', function(err){
    console.log('=== gulp-mocha err ===');
    console.log(err);
  }));
});

gulp.task('watch', function(){
  gulp.watch('*', ['test']);
});

gulp.task('mon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['test']);
});

gulp.task('default', ['mon']);
