import { BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Main from "./components/Main/Main";
import "./App.scss";

function App() {
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
