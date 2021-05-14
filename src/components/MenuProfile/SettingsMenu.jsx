import {
	faChevronLeft,
	faMoon,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Switch from "../_shared/Switch";
import DropdownItem from "../DropdownItem/DropdownItem";
import DropdownMenu from "../DropdownMenu/DropdownMenu";

function SettingsMenu({ setActiveMenu }) {
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

	return (
		<DropdownMenu name='settings' secondary>
			<h2>Settings</h2>
			<DropdownItem
				label='Back'
				leftIcon={faChevronLeft}
				action={() => setActiveMenu("main")}
			/>
			<DropdownItem
				label='Dark Mode'
				leftIcon={faMoon}
				right={
					<Switch checked={isDarkMode()} onChange={toggleDarkMode} />
				}
			/>
			<DropdownItem label='Log Out' leftIcon={faSignOutAlt} />
		</DropdownMenu>
	);
}

export default SettingsMenu;
