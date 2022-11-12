
export const server = () => {
	app.plug.server.init({
		server: {baseDir: `${app.path.build.html}`},
		notify: true,
		port: 3040
	})
};