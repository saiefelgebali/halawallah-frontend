import React, { useState } from "react";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import Menu from "../../../../components/Menu/Menu";
import MenuItem from "../../../../components/Menu/MenuItem";
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

	const MainMenu = () => (
		<div name='main'>
			<div label='settings' gotoMenu='settings'></div>
		</div>
	);

	return (
		<Menu>
			<MenuItem icon={faUser} label='Profile'>
				<Dropdown over left>
					<div>
						<div
							leftIcon={faCog}
							label='Settings'
							gotoMenu='settings'>
							Wag1
						</div>
						<div leftIcon={faUser} label='Profile' link='/profile'>
							Wag1
						</div>
					</div>
					<MainMenu />
				</Dropdown>
			</MenuItem>
		</Menu>
	);
}

export default MenuProfile;
