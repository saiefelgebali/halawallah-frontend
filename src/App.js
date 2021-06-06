import { Store } from "./store/store";
import { useContext } from "react";
import { setTheme } from "./util/theme";
import {
	ApolloClient,
	ApolloProvider,
	createHttpLink,
	split,
} from "@apollo/client";
import { cache } from "./cache";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import Authenticated from "./routing/Authenticated";
import Unauthenticated from "./routing/Unauthenticated";

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
		uri: `http://${process.env.REACT_APP_SERVER_HOST}/graphql`,
	});

	const wsLink = new WebSocketLink({
		uri: `ws://${process.env.REACT_APP_SERVER_HOST}/graphql`,
		options: {
			reconnect: true,
		},
	});

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === "OperationDefinition" &&
				definition.operation === "subscription"
			);
		},
		wsLink,
		httpLink
	);

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
		link: authLink.concat(splitLink),
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
