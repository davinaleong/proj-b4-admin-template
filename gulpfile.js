const gulp = require('gulp');
const debug = require('gulp-debug');
const del = require('del');
const eventStream = require('event-stream');

const paths = {
    sep: '/',
    root: './',
    nodeModules: './node_modules',
    dist: {
        dir: './dist',
        vendor: {
            dir: './dist/vendor',
            css: './dist/vendor/css',
            js: './dist/vendor/js',
            svgs: './dist/vendor/svgs'
        }
    }
};

const tasks = {
    default: 'default',
    copy: 'copy',
    del: 'del'
};

gulp.task(tasks.default, [tasks.del, tasks.copy]);

gulp.task(tasks.copy, () => {
    return eventStream.merge([
        // Font Awesome
        gulp.src(`${paths.nodeModules}/@fortawesome/fontawesome-free/js/*.js`)
            .pipe(debug({ title: "--- copied FontAwesome 5 Free scripts" }))
            .pipe(gulp.dest(paths.dist.vendor.js)),
        gulp.src(`${paths.nodeModules}/@fortawesome/fontawesome-free/svgs/**/*.svg`)
            .pipe(debug({ title: "--- copied FontAwesome 5 Free SVGs" }))
            .pipe(gulp.dest(paths.dist.vendor.svgs)),

        //Bootstrap
        gulp.src([
            `${paths.nodeModules}/bootstrap/dist/css/bootstrap.css`,
                `${paths.nodeModules}/bootstrap/dist/css/bootstrap.css.map`,
                `${paths.nodeModules}/bootstrap/dist/css/bootstrap.min.css`,
                `${paths.nodeModules}/bootstrap/dist/css/bootstrap.min.css.map`
            ])
            .pipe(debug({ title: "--- copied Bootstrap 4 styles" }))
            .pipe(gulp.dest(paths.dist.vendor.css)),
        gulp.src([
            `${paths.nodeModules}/bootstrap/dist/js/bootstrap.bundle.js`,
                `${paths.nodeModules}/bootstrap/dist/js/bootstrap.bundle.js.map`,
                `${paths.nodeModules}/bootstrap/dist/js/bootstrap.bundle.min.js`,
                `${paths.nodeModules}/bootstrap/dist/js/bootstrap.bundle.min.js.map`
            ])
            .pipe(debug({ title: "--- copied Bootstrap 4 bundle scripts" }))
            .pipe(gulp.dest(paths.dist.vendor.js)),

        //jQuery
        gulp.src(`${paths.nodeModules}/jquery/dist/**.*`)
            .pipe(debug({ title: "--- copied jQuery scripts" }))
            .pipe(gulp.dest(paths.dist.vendor.js))
    ]);
});

gulp.task(tasks.del, () => {
    return del.sync([
        `${paths.dist.vendor.dir}/**/*.*`
    ]);
});