// Gulp.js configuration
var
  // modules
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  htmlclean = require('gulp-htmlclean'),
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso');
  purgecss = require('gulp-purgecss');
  del = require('del');

var
  // development mode?
  devBuild = false,

  // folders
  folder = {
    src: 'app/',
    build: 'dist/'
  };

const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

// image processing
gulp.task('images', function () {
  var out = folder.build + 'images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      })
    ]))
    .pipe(gulp.dest(out));
});

// HTML processing
gulp.task('html', function () {
  var
    out = folder.build,
    page = gulp.src(folder.src + '*.html')
    .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

gulp.task('static', function () {
  return gulp.src(folder.src + "static/**/*")
    .pipe(gulp.dest(folder.build + "static/"))
});

gulp.task('styles', function () {
  return gulp.src(folder.src + "css/**/*")
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    }))
  //   .pipe(purgecss({
  //     content: [folder.src+"/*.html"]
  // }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest(folder.build + 'css/'))
});
gulp.task('videos', function () {
  return gulp.src(folder.src + "videos/**/*")
    .pipe(gulp.dest(folder.build + "videos/"))
});

gulp.task('clean', function(){
  return del(folder.build+"/**", {force:true});
});

// JavaScript processing
gulp.task('js', function () {

  var jsbuild = gulp.src(folder.src + 'js/**/*')
    .pipe(deporder());

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jsbuild.pipe(gulp.dest(folder.build + 'js/'));

});

gulp.task('run', gulp.series('clean', 'images', 'videos', 'styles', 'static', 'html', 'js'));
console.log("up");