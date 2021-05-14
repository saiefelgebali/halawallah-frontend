import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

export const Store = createContext();

export function StoreProvider({ children }) {
	// Get initial theme from localStorage - default white
	const theme = localStorage.getItem("theme") || "light";

	// Set default theme
	document.body.className = theme;

	const initialState = {
		theme,
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return <Store.Provider value={value}>{children}</Store.Provider>;
}
