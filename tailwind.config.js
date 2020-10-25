module.exports = {
	purge: ["./src/**/*.html", "./src/**/*.svelte"],
	theme: {
		screens: {
			xxs: "420px",
			xs: "510px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			xxl: "1600px",
		},
		container: {
			xxl: "max-width: 1600px;",
		},
		extend: {},
	},
	variants: {},
	plugins: [],
	future: {
		removeDeprecatedGapUtilities: true,
	},
	experimental: {
		// extendedSpacingScale: true,
		// extendedFontSizeScale: true,
	},
};
