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
	// Handle Dark Mode
	function setDarkMode() {
		return (document.body.className = "dark");
	}
	function setLightMode() {
		return (document.body.className = "light");
	}
	function toggleDarkMode(event) {
		if (event.target.checked) {
			setDarkMode();
		} else {
			setLightMode();
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
				right={<Switch onChange={toggleDarkMode} />}
			/>
			<DropdownItem label='Log Out' leftIcon={faSignOutAlt} />
		</DropdownMenu>
	);
}

export default SettingsMenu;
