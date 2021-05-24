import React from "react";
import {
	faComments,
	faHome,
	faPlus,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "../../../../components/Menu/Menu";
import MenuItem from "../../../../components/Menu/MenuItem";
import Logo from "../../../../assets/Logo";

// Menu Setup
export default function MenuPages() {
	return (
		<Menu>
			<MenuItem icon={<Logo />} label='Hala' to='/home' />
			<MenuItem icon={faHome} label='Home' to='/home' />
			<MenuItem icon={faPlus} label='Create' to='/create' />
			<MenuItem icon={faSearch} label='Search' to='/search' />
			<MenuItem icon={faComments} label='Messages' to='/messages' />
		</Menu>
	);
}
