import React from "react";
import { Route, Switch } from "react-router";
import Feed from "../Feed/Feed";
import styles from "./Main.module.scss";

function Main() {
	// Handle routing
	return (
		<main className={styles.main}>
			<Switch>
				<Route path='/home'>
					<div>
						<Feed />
					</div>
				</Route>
				<Route path='/'>
					<div>
						<Feed />
					</div>
				</Route>
			</Switch>
		</main>
	);
}

export default Main;
