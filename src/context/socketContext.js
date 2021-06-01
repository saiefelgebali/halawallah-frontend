import React, { createContext } from "react";
import { io } from "socket.io-client";
import { SOCKET } from "../api/socket";

export const SocketContext = createContext();

export function SocketContextProvider({ children }) {
	// Setup a new socket connection with authentication
	const socket = io(SOCKET, {
		auth: { accessToken: localStorage.getItem("accessToken") },
	});

	socket.on("welcome", ({ username, rooms }) => {
		console.log(
			`Established socket connection successfully as user: ${username}`
		);
		console.log(rooms);
	});

	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
}
