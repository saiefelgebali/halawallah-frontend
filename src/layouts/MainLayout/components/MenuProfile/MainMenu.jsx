import React, { useContext } from "react";
import { faChevronRight, faCog } from "@fortawesome/free-solid-svg-icons";
import { ProfileContext } from "../../../../context/profileContext";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

function MainMenu() {
	const profileContext = useContext(ProfileContext);

	return (
		<div name='main'>
			<div
				leftIcon={faCog}
				label='Settings'
				rightIcon={faChevronRight}
				gotoMenu='settings'
			/>
			<div
				left={
					<ProfilePicture
						username={profileContext.user.username}
						src={profileContext.pfp}
						block
					/>
				}
				label={profileContext.user.username}
				link='profile/saief'
			/>
		</div>
	);
}

export default MainMenu;
