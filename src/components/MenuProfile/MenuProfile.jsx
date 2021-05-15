import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../DropdownItem/DropdownItem";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";
import {
	faChevronRight,
	faCog,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import SettingsMenu from "./SettingsMenu";

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

	return (
		<Menu>
			<Dropdown
				open={open}
				setOpen={setOpen}
				activeMenu={activeMenu}
				over
				left>
				{MainMenu()}
				{SettingsMenu({ setActiveMenu })}
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
