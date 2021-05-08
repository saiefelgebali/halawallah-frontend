import React from "react";
import NavigationDefault from "./NavigationDefault";
import NavigationTouch from "./NavigationTouch";
import { isTouchDevice } from "../../util/touch";

function Navigation() {
	// Touch-based UI Navigation
	if (isTouchDevice()) {
		return <NavigationTouch />;
	}

	// Default UI
	return <NavigationDefault />;
}

export default Navigation;
