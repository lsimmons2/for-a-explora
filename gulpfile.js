

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');
var Server = require('karma').Server;

gulp.task('backTest', function(){
  gulp.src('./test/server.spec.js')
  .pipe(mocha().on('error', function(err){
    console.log('=== gulp-mocha err ===');
    console.log(err);
  }));
});

gulp.task('frontTest', function(done){
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch', function(){
  gulp.watch('*', ['backTest']);
  gulp.watch('public/**/*.js', ['frontTest']);
});

gulp.task('mon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
    }
  })
    .on('start', ['watch'])
    .on('restart', ['watch'])
    .on('change', ['watch']);
});

gulp.task('default', ['mon']);
