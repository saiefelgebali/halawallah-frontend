import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Store } from "../../store/store";
import { logout as logoutAction } from "../../store/actions";
import Switch from "../../components/_shared/Switch";
import styles from "./SettingsPage.module.scss";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "../../graphql/mutation";

function SettingsPage() {
	// Context for logging out
	const { state, dispatch } = useContext(Store);

	const [logout] = useMutation(LOGOUT, {
		variables: { token: state.refreshToken },
	});

	async function handleLogout() {
		// Logout mutation
		await logout();
		// Update store
		logoutAction(dispatch);
	}

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
	return (
		<div className={styles.settingsPage}>
			<div className={styles.title}>
				<h1>Settings</h1>
			</div>
			<div className={styles.options}>
				<label className={styles.option}>
					Dark Mode
					<Switch checked={isDarkMode} onChange={toggleDarkMode} />
				</label>
				<div className={styles.option} onClick={handleLogout}>
					<span>Logout</span>
					<FontAwesomeIcon
						className={styles.icon}
						icon={faSignOutAlt}
					/>
				</div>
			</div>
		</div>
	);
}

export default SettingsPage;
