import React, { createContext, useContext } from "react";

export const AppContext = createContext();

export function AppContextProvider({ children }) {
	const initialState = {};

	return <AppContext.Provider>{children}</AppContext.Provider>;
}

export default AppContext;
