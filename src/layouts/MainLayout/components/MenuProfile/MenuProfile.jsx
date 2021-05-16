import React, { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import Menu from "../../../../components/Menu/Menu";
import MenuItem from "../../../../components/Menu/MenuItem";
import SettingsMenu from "./SettingsMenu";
import MainMenu from "./MainMenu";

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

	return (
		<Menu>
			<Dropdown open={open} setOpen={setOpen} over left>
				{MainMenu()}
				{SettingsMenu()}
			</Dropdown>
			<MenuItem
				icon={faUser}
				label={"saiefelgebali"}
				onClick={() => setOpen(!open)}
			/>
		</Menu>
	);
}

export default MenuProfile;
