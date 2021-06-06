import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../pages/AuthLoginPage/LoginPage";
import RegisterPage from "../pages/AuthRegisterPage/RegisterPage";
import styles from "./App.module.scss";

function Unauthenticated() {
	// Route unauthenticated users
	return (
		<div id={styles.app}>
			<Router>
				<Switch>
					<Route exact path='/login' component={LoginPage} />

					<Route exact path='/register' component={RegisterPage} />

					{/* Default Route */}
					<Route path='/' component={LoginPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default Unauthenticated;
