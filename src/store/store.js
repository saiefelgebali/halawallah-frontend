import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

export const Store = createContext();

export function StoreProvider({ children }) {
	// Get initial theme from localStorage - default white
	const initialTheme = localStorage.getItem("theme") || "light";

	const initialState = {
		initialTheme,
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return <Store.Provider value={value}>{children}</Store.Provider>;
}
