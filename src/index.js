import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./store/store";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./sassStyles/_global.scss";
import "./sassStyles/_typography.scss";

// Set up Apollo Client for graphql
const client = new ApolloClient({
	uri: "http://127.0.0.1:5000/graphql",
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<StoreProvider>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</StoreProvider>,
	document.getElementById("root")
);
