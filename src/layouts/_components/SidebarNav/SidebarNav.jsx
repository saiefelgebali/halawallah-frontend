import React from "react";
import MenuPages from "../MenuPages/MenuPages";
import MenuProfile from "../MenuProfile/MenuProfile";
import Sidebar from "../../../components/Sidebar/Sidebar";

function SidebarNav() {
	return (
		<Sidebar>
			<MenuPages />
			<MenuProfile />
		</Sidebar>
	);
}

export default SidebarNav;
