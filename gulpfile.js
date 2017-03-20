var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var imagemin = require("gulp-imagemin");
var uglify = require('gulp-uglify');
var pump = require('pump');
var gulpCopy = require("gulp-copy");

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'extended'
};
var autoprefixerOptions = {
  browsers: ["last 300 version","IE 8","> 1%"],
  cascade: false
};

gulp.task("watch",["browserSync","sass"],function () {
  gulp.watch("src/*.html",["html"]);
  gulp.watch("src/sass/**/*.sass",["sass"]);
  gulp.watch("src/js/**/*.js",["compress"]);
  gulp.watch("src/images/**",["imagemin"]);
  gulp.watch("src/**/*.js").on("change",reload);
  gulp.watch("src/**/*.html").on("change",reload);
});


gulp.task("html",function () {
   return gulp.src('src/**/*.html')
       .pipe(gulpCopy('dist/',{prefix:1}))
       .pipe(gulp.dest('dist/'));
});
gulp.task("compress",function(cb){
  pump([
    gulp.src('src/js/**/*.js'),
    uglify(),
    gulp.dest('dist/assets/js')
    ],
    cb
    );
});
gulp.task("sass",function () {
  return gulp.src("src/sass/**/*.sass")
  .pipe(sass(sassOptions))
  .on("error",sass.logError)
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(browserSync.reload({
    stream:true
  }))
  .pipe(gulp.dest("dist/assets/css"));
});
gulp.task("browserSync",function(){
  browserSync.init({
    server:{
      baseDir:'dist'
    },
  })
});
gulp.task("autoprefixer",function () {
  gulp.src('dist/assets/css/**/*.css')
  .pipe(autoprefixer(autoprefixerOptions))
  .pipe(gulp.dest('dist/assets/css'));
});
gulp.task("imagemin",function () {
  return  gulp.src("src/images/**")
          .pipe(imagemin())
          .pipe(gulp.dest("dist/assets/images"));
});