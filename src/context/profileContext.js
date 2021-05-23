import React, { createContext } from "react";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/query";

export const ProfileContext = createContext();

export function ProfileContextProvider({ children }) {
	// Keep current profile details stored

	// const { loading, error, data } = useQuery(ME);
	const { data } = useQuery(ME, {
		fetchPolicy: "cache-first",
	});

	const me = data?.me;

	return (
		<ProfileContext.Provider value={me}>{children}</ProfileContext.Provider>
	);
}
