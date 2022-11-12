import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './template';
const srcFolder = './src';

 export const path = {
	build: {
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		img: `${buildFolder}/images/`,
		db: `${buildFolder}/db/`,
	},
	src: {
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/styles/*.scss`,
		js: `${srcFolder}/*.js`,
		img: `${srcFolder}/img/**/*.*`,
		db: `${srcFolder}/db/**/*.*`,
		files: `${srcFolder}/**/*.[(js)(html)(scss)]`,
	},
	watch: {
		html: `${srcFolder}/*.html`,
		scss: `${srcFolder}/styles/*.scss`,
		js: `${srcFolder}/**/*.js`,
		files: `${srcFolder}/**/*.*`,
	},
	clean: buildFolder,
	buildFolder,
	srcFolder,
	rootFolder,
}