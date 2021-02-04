const fontMagician = require("postcss-font-magician");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const mode = process.env.NODE_ENV;
const dev = mode === "development";

module.exports = {
	plugins: [
		fontMagician({
			variants: {
				'Source Code Pro': {
					'300': [],
					'400': [],
					'700': []
				}
			},
			foundries: ['google']
		}),

		tailwindcss("./tailwind.config.cjs"),
		
		autoprefixer,
		
		!dev && cssnano({
			preset: "default",
		}),
	],
};
