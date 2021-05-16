import {
	faChevronLeft,
	faMoon,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Switch from "../../../../components/_shared/Switch";

function SettingsMenu() {
	// Check if dark mode is on
	function isDarkMode() {
		return document.body.classList.contains("dark");
	}

	// Handle Dark Mode
	function toggleDarkMode(event) {
		if (event.target.checked) {
			localStorage.setItem("theme", "dark");
			document.body.classList.replace("light", "dark");
		} else {
			localStorage.setItem("theme", "light");
			document.body.classList.replace("dark", "light");
		}
	}

	return <div name='settings' secondary></div>;
}

export default SettingsMenu;
