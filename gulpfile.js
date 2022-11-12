import gulp from "gulp";
import { path } from "./Gulp/config/path.js";
import { plug } from "./Gulp/config/plugins.js";

global.app = {
	path: path,
	gulp: gulp,
	plug: plug,
}

import { img } from "./Gulp/tasks/img.js";
import { db } from "./Gulp/tasks/db.js";
import { html } from "./Gulp/tasks/html.js";
import { scss } from "./Gulp/tasks/scss.js";
import { js } from "./Gulp/tasks/js.js";
import { reset } from "./Gulp/tasks/reset.js";
import { server } from "./Gulp/tasks/server.js";

function watcher() {
	gulp.watch(path.watch.html, html);
	// gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
}

const dev = gulp.series(reset, html, scss, js, img, db, gulp.parallel(watcher, server));

gulp.task('default', dev);
