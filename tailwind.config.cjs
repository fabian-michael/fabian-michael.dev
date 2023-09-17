/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	daisyui: {
		themes: ["light", "night", "cupcake"],
		darkTheme: 'night',
	},
	theme: {
		container: {
			center: true,
			padding: '1.5rem',
		},

		extend: {
			aspectRatio: {
				'wide': '21 / 9',
			},
			fontFamily: {
				'pacifico': ['Pacifico', 'cursive'],
				'poppins': ['Poppins', 'sans-serif'],
				'sans': ['Poppins', 'sans-serif'],
			},
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
	]
}