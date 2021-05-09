import React from "react";
import "./NavigationDefault.scss";
import MenuPages from "../MenuPages/MenuPages";
import MenuProfile from "../MenuProfile/MenuProfile";

function NavigationDefault() {
	return (
		<header className='sidebar'>
			<div className='banner'>
				<MenuPages />
				<MenuProfile />
			</div>
		</header>
	);
}

export default NavigationDefault;
