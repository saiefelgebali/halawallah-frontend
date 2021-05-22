import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

export const Store = createContext();

export function StoreProvider({ children }) {
	// Get initial theme from localStorage - default white
	const initialTheme = localStorage.getItem("theme") || "light";
	const refreshToken = localStorage.getItem("refreshToken");
	const accessToken = localStorage.getItem("accessToken");
	const isAuthenticated = Boolean(refreshToken);

	const initialState = {
		initialTheme,
		refreshToken,
		accessToken,
		isAuthenticated,
	};

	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };

	return <Store.Provider value={value}>{children}</Store.Provider>;
}
