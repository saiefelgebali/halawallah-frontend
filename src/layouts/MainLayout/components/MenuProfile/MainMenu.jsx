import React from "react";
import { faChevronRight, faCog } from "@fortawesome/free-solid-svg-icons";

function MainMenu() {
	return (
		<div name='main'>
			<div
				leftIcon={faCog}
				label='Settings'
				rightIcon={faChevronRight}
				gotoMenu='settings'
			/>
		</div>
	);
}

export default MainMenu;
