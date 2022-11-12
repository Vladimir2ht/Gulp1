import uglify from "gulp-uglify";

export const js = () => {

	return app.gulp.src(app.path.src.js, {sourcemaps: true})
		.pipe(uglify())
		.pipe(app.plug.rename({
			extname: ".min.js",
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plug.server.stream())
};