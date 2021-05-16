import {
	faChevronLeft,
	faMoon,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Switch from "../../../../components/_shared/Switch";

function SettingsMenu() {
	// Dark mode with default value
	const [isDarkMode, setIsDarkMode] = useState(
		document.body.classList.contains("dark")
	);

	// Handle changes to dark mode
	useEffect(() => {
		if (isDarkMode) {
			localStorage.setItem("theme", "dark");
			document.body.classList.replace("light", "dark");
		} else {
			localStorage.setItem("theme", "light");
			document.body.classList.replace("dark", "light");
		}
	}, [isDarkMode, setIsDarkMode]);

	// Handle Dark Mode
	function toggleDarkMode(event) {
		// Toggled to dark
		if (event.target.checked) {
			setIsDarkMode(true);
		}
		// Toggled to light
		else {
			setIsDarkMode(false);
		}
	}

	return (
		<div name='settings' secondary>
			<div leftIcon={faChevronLeft} label='Back' gotoMenu='main' />
			<div
				leftIcon={faMoon}
				label='Dark Mode'
				right={
					<Switch checked={isDarkMode} onChange={toggleDarkMode} />
				}
			/>
			<div leftIcon={faSignOutAlt} label='Log out' />
		</div>
	);
}

export default SettingsMenu;
