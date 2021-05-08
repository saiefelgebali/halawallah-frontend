import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./sassStyles/_global.scss";
import "./sassStyles/_typography.scss";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
