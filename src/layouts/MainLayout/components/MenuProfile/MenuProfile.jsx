import React, { useContext, useState } from "react";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import Dropdown from "../../../../components/Dropdown/Dropdown";
import Menu from "../../../../components/Menu/Menu";
import MenuItem from "../../../../components/Menu/MenuItem";
import SettingsMenu from "./SettingsMenu";
import MainMenu from "./MainMenu";
import { ProfileContext } from "../../../../context/profileContext";

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

	const profileContext = useContext(ProfileContext);

	return (
		<Menu>
			<Dropdown open={open} setOpen={setOpen} over left>
				{MainMenu()}
				{SettingsMenu()}
			</Dropdown>
			<MenuItem
				icon={
					<ProfilePicture
						src={profileContext.pfp}
						username={profileContext.user.username}
					/>
				}
				label={profileContext?.user?.username}
				onClick={() => setOpen(!open)}
			/>
		</Menu>
	);
}

export default MenuProfile;
