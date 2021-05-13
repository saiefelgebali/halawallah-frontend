import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../DropdownItem/DropdownItem";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";
import {
	faChevronLeft,
	faChevronRight,
	faCog,
	faMoon,
	faSignOutAlt,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import Switch from "../_shared/Switch";

function MenuProfile() {
	/**
	 * @summary Sidebar Menu - Single Item Opens a Dropdown Menu
	 *
	 * @description
	 * - Opens a dropdown menu on click
	 * - Logout
	 * - Dark Mode
	 * - Link to Profile
	 *
	 * @returns {JSX.Element}
	 */
	const [open, setOpen] = useState(false);
	const [activeMenu, setActiveMenu] = useState("main");

	const MainMenu = () => (
		<DropdownMenu name='main'>
			<DropdownItem
				label='Settings'
				leftIcon={faCog}
				rightIcon={faChevronRight}
				action={() => setActiveMenu("settings")}
			/>
			<DropdownItem label='Profile' leftIcon={faUser} />
		</DropdownMenu>
	);

	const SettingsMenu = () => (
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
				right={<Switch />}
			/>
			<DropdownItem label='Log Out' leftIcon={faSignOutAlt} />
		</DropdownMenu>
	);

	return (
		<Menu>
			<Dropdown
				open={open}
				setOpen={setOpen}
				activeMenu={activeMenu}
				over
				left>
				{MainMenu()}
				{SettingsMenu()}
			</Dropdown>
			<MenuItem
				icon={faUser}
				label='Profile'
				onClick={() => setOpen(true)}
			/>
		</Menu>
	);
}

export default MenuProfile;
