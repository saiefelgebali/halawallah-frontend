import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Store } from "./store/store";
import { useContext } from "react";
import { setTheme } from "./util/theme";
import { ApolloClient, ApolloProvider, createHttpLink } from "@apollo/client";
import { cache } from "./cache";
import { setContext } from "@apollo/client/link/context";
import LoginPage from "./pages/AuthLoginPage/LoginPage";
import RegisterPage from "./pages/AuthRegisterPage/RegisterPage";
import MainLayout from "./layouts/MainLayout/MainLayout";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import CreatePage from "./pages/CreatePage/CreatePage";
import NotificationPage from "./pages/NotificationPage/NotificatonPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import ChatPage from "./pages/ChatPage/ChatPage";

import styles from "./App.module.scss";
import { ProfileContextProvider } from "./context/profileContext";
import ChatLayout from "./layouts/ChatLayout/ChatLayout";

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

	const ChatApp = () => (
		<ChatLayout>
			<Switch>
				<Route exact path='/:room_id' component={ChatPage} />
			</Switch>
		</ChatLayout>
	);

	const MainApp = () => (
		<MainLayout>
			<Switch>
				<Route exact path='/home' component={HomePage} />

				<Route exact path='/create' component={CreatePage} />

				<Route exact path='/search' component={SearchPage} />

				<Route
					exact
					path='/notifications'
					component={NotificationPage}
				/>

				<Route
					exact
					path='/profile/:username'
					component={ProfilePage}
				/>

				{/* Default Route */}
				<Route path='/' component={HomePage} />
			</Switch>
		</MainLayout>
	);

	return (
		<div id={styles.app}>
			<Router>
				<ProfileContextProvider>
					<Switch>
						<Route path='/chat' component={ChatApp} />
						<Route path='/' component={MainApp} />
					</Switch>
				</ProfileContextProvider>
			</Router>
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
		cache: cache,
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
