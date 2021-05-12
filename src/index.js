import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { StoreProvider } from "./store/store";
import "./sassStyles/_global.scss";
import "./sassStyles/_typography.scss";

ReactDOM.render(
	<StoreProvider>
		<App />
	</StoreProvider>,
	document.getElementById("root")
);
