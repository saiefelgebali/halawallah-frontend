import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Main from "./components/Main/Main";
import "./App.scss";
import Feed from "./components/Feed/Feed";

function App() {
	return (
		<div id='app'>
			<Router>
				<Navigation />
				<Main>
					<Switch>
						<Route path='/home'>
							<Feed />
						</Route>
					</Switch>
				</Main>
			</Router>
		</div>
	);
}

export default App;
