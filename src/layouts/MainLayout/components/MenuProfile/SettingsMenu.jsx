import { useMutation } from "@apollo/client";
import {
	faChevronLeft,
	faMoon,
	faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useContext } from "react";
import Switch from "../../../../components/_shared/Switch";
import { Store } from "../../../../store/store";
import { logout as logoutAction } from "../../../../store/actions";
import { LOGOUT } from "../../../../graphql/mutations";

function SettingsMenu() {
	const { state, dispatch } = useContext(Store);
	const [logout] = useMutation(LOGOUT, {
		variables: { token: state.refreshToken },
	});

	// Handle logging out
	async function handleLogout() {
		// Delete refreshToken from system
		await logout();
		// Update application state
		logoutAction(dispatch);
	}

	//#region Dark Mode

	// Dark mode with default value
	const [isDarkMode, setIsDarkMode] = useState(
		document.body.classList.contains("dark")
	);

	// Handle changes to dark mode
	useEffect(() => {
		if (isDarkMode) {
			localStorage.setItem("theme", "dark");
			document.body.classList.replace("light", "dark");
		} else {
			localStorage.setItem("theme", "light");
			document.body.classList.replace("dark", "light");
		}
	}, [isDarkMode, setIsDarkMode]);

	// Handle Dark Mode
	function toggleDarkMode(event) {
		// Toggled to dark
		if (event.target.checked) {
			setIsDarkMode(true);
		}
		// Toggled to light
		else {
			setIsDarkMode(false);
		}
	}
	//#endregion

	return (
		<div name='settings' secondary>
			<div leftIcon={faChevronLeft} label='Back' gotoMenu='main' />
			<div
				leftIcon={faMoon}
				label='Dark Mode'
				right={
					<Switch checked={isDarkMode} onChange={toggleDarkMode} />
				}
			/>
			<div
				leftIcon={faSignOutAlt}
				label='Log out'
				action={handleLogout}
			/>
		</div>
	);
}

export default SettingsMenu;
