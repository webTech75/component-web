var gulp = require('gulp');
var mocha = require('gulp-mocha');

const testScripts = 'tests/**/*.js?(x)';

gulp.task('test', () =>
  gulp.src(testScripts).pipe(
    mocha({
      compilers: 'js:babel-core/register',
      require: ['tests/test-helpers/setup.js'],
    })
  )
);

gulp.task('react', function() {
    return gulp.src('./node_modules/react/dist/react.min.js')
      .pipe(gulp.dest('../js'));
})

gulp.task('react-dom', function() {
    return gulp.src('./node_modules/react-dom/dist/react-dom.min.js')
      .pipe(gulp.dest('../js'));
})

gulp.task('default', function() {
  gulp.start('react', 'react-dom');
})
