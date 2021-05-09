import React from "react";
import { Route, Switch } from "react-router";
import Feed from "../Feed/Feed";
import "./Main.scss";

function Main() {
	// Handle routing
	return (
		<main className='main'>
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
