
export const db = () => {

	return app.gulp.src(app.path.src.db)
		.pipe(app.gulp.dest(app.path.build.db))
};