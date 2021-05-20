import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Store } from "./store/store";
import { useContext } from "react";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import styles from "./App.module.scss";
import CreatePage from "./pages/CreatePage/CreatePage";
import LoginPage from "./pages/AuthLoginPage/LoginPage";
import RegisterPage from "./pages/AuthRegisterPage/RegisterPage";

function App() {
	/**
	 * Top level of application
	 * - Apply Color Theme
	 * - Apply Router
	 * - Apply StoreProvider
	 */

	const { state } = useContext(Store);

	// Apply css theme on page load
	switch (state.initialTheme) {
		case "light":
			document.body.classList.add("light");
			break;
		case "dark":
			document.body.classList.add("dark");
			break;
		default:
			document.body.classList.add("light");
			break;
	}

	// Route unauthenticated users
	if (!state.isAuthenticated) {
		return (
			<div id={styles.app}>
				<Router>
					<Switch>
						<Route exact path='/login' component={LoginPage} />

						<Route
							exact
							path='/register'
							component={RegisterPage}
						/>

						{/* Default Route */}
						<Route path='/' component={LoginPage} />
					</Switch>
				</Router>
			</div>
		);
	}

	// Route authenticated users
	return (
		<div id={styles.app}>
			<Router>
				<Switch>
					<Route exact path='/home' component={HomePage} />

					<Route exact path='/create' component={CreatePage} />

					<Route
						exact
						path='/profile/:username'
						component={ProfilePage}
					/>

					{/* Default Route */}
					<Route path='/' component={HomePage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
