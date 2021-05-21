import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Store } from "./store/store";
import { useContext } from "react";
import { setTheme } from "./util/theme";
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import LoginPage from "./pages/AuthLoginPage/LoginPage";
import RegisterPage from "./pages/AuthRegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreatePage from "./pages/CreatePage/CreatePage";

import styles from "./App.module.scss";
import { ProfileContextProvider } from "./context/profileContext";

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

function Authenticated() {
	// Route authenticated users
	return (
		<div id={styles.app}>
			<ProfileContextProvider>
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
			</ProfileContextProvider>
		</div>
	);
}

function App() {
	/**
	 * Top level of application
	 * - Apply Color Theme
	 * - Apply Router
	 * - Apply ApolloProvider & set graphql client
	 */

	const { state } = useContext(Store);

	// Apply css theme on page load
	setTheme(state.initialTheme);

	// Set up Apollo Client for graphql
	const httpLink = createHttpLink({
		uri: `${process.env.REACT_APP_BACKEND}/graphql`,
	});

	const authLink = setContext((_, { headers }) => {
		// get the authentication token from state
		const token = state.accessToken;
		// return the headers to the context so httpLink can read them
		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});

	const client = new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
		fetchOptions: {
			mode: "no-cors",
		},
	});

	return (
		<ApolloProvider client={client}>
			{state.isAuthenticated ? <Authenticated /> : <Unauthenticated />}
		</ApolloProvider>
	);
}

export default App;
