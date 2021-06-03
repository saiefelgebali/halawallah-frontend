import React, { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/query";
import styles from "./ContentLoading.module.scss";
import Logo from "../assets/Logo";
import { Store } from "../store/store";
import { logout } from "../store/actions";

export const ProfileContext = createContext();

export function ProfileContextProvider({ children }) {
	const { dispatch } = useContext(Store);
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
				<h1 className='mb-3'>There was a problem logging you in</h1>
				<div
					className='btn btn-primary'
					onClick={() => logout(dispatch)}>
					Click here to log back in
				</div>
			</div>
		);
	}

	// Logged out
	if (!me) {
		// Try to use refreshToken to get new accessToken
		return (
			<div className={styles.container}>
				<h1>You have been logged out </h1>
				<div
					className='btn btn-primary'
					onClick={() => logout(dispatch)}>
					Click here to log back in
				</div>
			</div>
		);
	}
	return (
		<ProfileContext.Provider value={me}>{children}</ProfileContext.Provider>
	);
}
