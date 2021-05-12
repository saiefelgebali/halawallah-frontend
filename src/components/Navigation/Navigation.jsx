import React from "react";
import NavigationDefault from "../NavigationDefault/NavigationDefault";
// import NavigationTouch from "../NavigationTouch/NavigationTouch";
import { isTouchDevice } from "../../util/touch";

function Navigation() {
	// Touch-based UI Navigation
	if (isTouchDevice()) {
		return <NavigationDefault />;
		// return <NavigationTouch />;
	}

	// Default UI
	return <NavigationDefault />;
}

export default Navigation;
