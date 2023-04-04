import gulp from 'gulp';
import concat from 'gulp-concat';
import autoPrefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';


gulp.task('css', () => {
    return gulp.src([
        './public/css/*.css',
    ])
        .pipe(concat('style-min.css'))
        .pipe(cleanCSS())
        .pipe(autoPrefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./public/css/'))
});

gulp.task('js', () => {
    return gulp.src([
        './public/js/*.js',
        ])
        .pipe(concat('script-min.js'))
        .pipe(gulp.dest('./public/js/'))
});
