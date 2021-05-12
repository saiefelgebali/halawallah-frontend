import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Main from "./components/Main/Main";
import "./App.scss";
import { Store } from "./store/store";
import { useContext } from "react";

function App() {
	/**
	 * Top level of application
	 * - Apply Color Theme
	 * - Apply Router
	 * - Apply StoreProvider
	 */

	const { state } = useContext(Store);

	// Apply css theme
	switch (state.theme) {
		case "light":
			document.body.classList.add = "light";
			break;
		case "dark":
			document.body.classList.add = "dark";
			break;
		default:
			document.body.classList.add = "light";
			break;
	}

	return (
		<div id='app'>
			<Router>
				<Navigation />
				<Main />
			</Router>
		</div>
	);
}

export default App;
