import React, { useRef } from "react";
import MenuPages from "../MenuPages/MenuPages";
import MenuProfile from "../MenuProfile/MenuProfile";
import { sidebar, banner } from "./NavigationDefault.module.scss";

function NavigationDefault() {
	const dropdown = useRef();

	return (
		<header className={sidebar}>
			<div className={banner}>
				<MenuPages />
				<MenuProfile dropdown={dropdown} />
			</div>
		</header>
	);
}

export default NavigationDefault;
