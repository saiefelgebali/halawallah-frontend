import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Store } from "./store/store";
import { useContext } from "react";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import styles from "./App.module.scss";
import CreatePage from "./pages/CreatePage/CreatePage";
import LoginPage from "./pages/LoginPage/LoginPage";

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

	return (
		<div id={styles.app}>
			<Router>
				<Switch>
					<Route exact path='/home'>
						<HomePage />
					</Route>

					<Route exact path='/create'>
						<CreatePage />
					</Route>

					<Route exact path='/login'>
						<LoginPage />
					</Route>

					<Route exact path='/profile/:username'>
						<ProfilePage />
					</Route>

					{/* Default Route */}
					<Route path='/'>
						<HomePage />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
