import React, { createContext } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/query";
import styles from "./ContentLoading.module.scss";
import Logo from "../assets/Logo";

export const ProfileContext = createContext();

export function ProfileContextProvider({ children }) {
	// Keep current profile details stored

	const { data, loading, error } = useQuery(ME, {
		fetchPolicy: "cache-and-network",
	});

	const me = data?.me;

	// Show floating loading icon
	if (!data && loading) {
		return (
			<div className={styles.container}>
				<div className={styles.icon}>
					<Logo className={styles.logo} />
				</div>
			</div>
		);
	}

	// Show error page
	if (error) {
		return (
			<div className={styles.container}>
				<div>
					<h1>Oops</h1>
					<div>There was a problem logging you in</div>
				</div>
			</div>
		);
	}

	// Logged out
	if (!me) {
		// Try to use refreshToken to get new accessToken
		return (
			<div className={styles.container}>
				<p>
					You have been logged out <br />
					<a href='/login'>Click here to log back in</a>
				</p>
			</div>
		);
	}
	return (
		<ProfileContext.Provider value={me}>{children}</ProfileContext.Provider>
	);
}
