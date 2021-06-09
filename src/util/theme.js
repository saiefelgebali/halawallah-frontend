export function setTheme(theme) {
	// // Check device theme
	// // If dark, override selected theme
	// const deviceDarkMode = window.matchMedia(
	// 	"(prefers-color-scheme: dark)"
	// ).matches;

	switch (theme) {
		case "light":
			document.body.classList.add("light");
			break;
		case "dark":
			document.body.classList.add("dark");
			break;
		default:
			document.body.classList.add("light");
			break;
	}
}
