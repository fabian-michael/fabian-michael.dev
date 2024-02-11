const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ['light', 'night', 'cupcake'],
		darkTheme: 'night',
	},
	theme: {
		screens: {
			'xs': '475px',
			...defaultTheme.screens,
		},

		container: {
			center: true,
			padding: '1.5rem',
		},

		extend: {
			aspectRatio: {
				wide: '21 / 9',
			},
			fontFamily: {
				'pacifico': ['Pacifico', 'cursive'],
				'overpass': ['Overpass', 'cursive'],
				'poppins': ['Poppins', 'cursive'],
				'sans': ['Poppins', 'sans-serif'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui')
	],
};
