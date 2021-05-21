export function setTheme(theme) {
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
