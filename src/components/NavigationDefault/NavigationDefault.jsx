import React from "react";
import MenuPages from "../MenuPages/MenuPages";
import MenuProfile from "../MenuProfile/MenuProfile";
import { sidebar, banner } from "./NavigationDefault.module.scss";

function NavigationDefault() {
	return (
		<header className={sidebar}>
			<div className={banner}>
				<MenuPages />
				<MenuProfile />
			</div>
		</header>
	);
}

export default NavigationDefault;
