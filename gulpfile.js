// Dependencies
var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')();

/*===== Output Names =====*/
var devJs = "rafalides"

// Structure
var sassSrc = "assets/sass/**/*.scss",
    jsDest = 'js',
    javascriptSrc = "assets/js/*.js";

gulp.task('scripts', function() {
    gulp.src(javascriptSrc)
        .pipe(plugins.plumber())
        .pipe(plugins.concat(devJs + '.js'))
        .pipe(gulp.dest('js'))
        .pipe(plugins.rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('js'));
});

gulp.task('styles', function() {
    return gulp.src(sassSrc)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            noCache: true,
            outputStyle: 'compressed'
        }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.rename(function(path) {
            path.basename += ".min";
        }))
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
});

gulp.task('stylesmax', function() {
    return gulp.src(sassSrc)
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass({
            noCache: true,
            outputStyle: 'expanded'
        }).on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.sourcemaps.write('.'))
        .pipe(gulp.dest('css'))
});

gulp.task('watch', function() {
    gulp.watch(javascriptSrc, ['scripts']);
    gulp.watch(sassSrc, ['styles']);
    gulp.watch(sassSrc, ['stylesmax']);
});

gulp.task('default', ['scripts', 'styles', 'stylesmax', 'watch']);
