
import dartSass from "sass";
import gulpSass from "gulp-sass";
import concat from "gulp-concat";

const sass = gulpSass(dartSass)

export const scss = () => {
	return app.gulp.src(app.path.src.scss, {sourcemaps: true})
		// sourcemaps для отслеживания ошибок при нескольких файлах источников
		.pipe(sass({
			outputStyle: "compressed",
		}))
		.pipe(concat("styles.min.css"))
		// .pipe(app.plug.rename({
		// 	extname: ".min.css",
		// }))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plug.server.stream())
};