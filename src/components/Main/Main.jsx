import React from "react";
import { Route, Switch } from "react-router";
import Feed from "../Feed/Feed";
import ProfilePage from "../ProfilePage/ProfilePage";
import styles from "./Main.module.scss";

function Main() {
	// Handle routing
	return (
		<main className={styles.main}>
			<Switch>
				<Route path='/home'>
					<Feed />
				</Route>
				<Route path='/profile/:username'>
					<ProfilePage />
				</Route>
				<Route path='/'>
					<Feed />
				</Route>
			</Switch>
		</main>
	);
}

export default Main;
