const gulp = require('gulp');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");
const csso = require("postcss-csso");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const del = require("del");



//sass to css

gulp.task('sass', function() {
    return gulp.src("source/sass/style.scss")
        .pipe(sass())
        .pipe(postcss([
          autoprefixer(),
        ]))
        .pipe(gulp.dest("source/css"))
        .pipe(browserSync.stream());
});

//Server & watcher

gulp.task('server', gulp.series('sass', function() {
    browserSync.init({
        server: {
            baseDir: "source/"
        }
    });

    gulp.watch("source/sass/*.scss", gulp.series('sass'));
    gulp.watch("source/*.html").on('change', browserSync.reload);
    gulp.watch("source/js/*.js").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('server'));

//SVG to spites

const sprite = () => {
  return gulp.src("img/*-icon.svg")
    .pipe(svgstore({inlineSvg: true}))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("img"));
}

exports.sprite = sprite

//BUILD

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/img/*.{png,svg}",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

const stylesMin = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
}

exports.stylesMin = stylesMin;

const scripts = () => {
  return gulp.src("source/js/script.js")
    .pipe(uglify())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
}

exports.scripts = scripts;

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
}

const clean = () => {
  return del("build");
};

const build = gulp.series(
  clean,
  gulp.parallel(
    stylesMin,
    html,
    scripts,
    copy
  ));

exports.build = build;



