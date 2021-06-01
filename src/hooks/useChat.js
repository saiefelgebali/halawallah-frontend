import { useCallback, useContext, useEffect } from "react";
import { ProfileContext } from "../context/profileContext";
import { SocketContext } from "../context/socketContext";
import { cache } from "../cache";
import { CHAT_ROOM_MESSAGES } from "../graphql/query";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event

function useChat(room_id) {
	// Function to add a new message to profileChatRoom messages
	const updateCachedRoomMessages = useCallback(
		(newMessage) => {
			newMessage = {
				...newMessage,
				__typename: "Message",
			};

			// Read old cached data
			const { getChatRoomMessages } = cache.readQuery({
				query: CHAT_ROOM_MESSAGES,
				variables: { room_id },
			});

			// Create new cache object with updated data
			const newData = {
				getChatRoomMessages: {
					...getChatRoomMessages,
					count: getChatRoomMessages.count + 1,
					data: [newMessage, ...getChatRoomMessages.data],
				},
			};

			// Write updated data back to cache
			cache.writeQuery({
				query: CHAT_ROOM_MESSAGES,
				variables: { room_id },
				data: newData,
				broadcast: true,
			});
		},
		[room_id]
	);

	// Get username
	const { username } = useContext(ProfileContext);

	// Get socket from context
	const socket = useContext(SocketContext);

	// When a message is received, add it to top of messages array
	const receiveMessage = useCallback(
		(message) => {
			// Update cache with new message
			updateCachedRoomMessages(message);
		},
		[updateCachedRoomMessages]
	);

	useEffect(() => {
		// Listens for incoming messages
		socket.on(NEW_CHAT_MESSAGE_EVENT, receiveMessage);

		// Disconnect event listener when unmounted
		return () => {
			socket.off(NEW_CHAT_MESSAGE_EVENT, receiveMessage);
		};
	}, [socket, receiveMessage]);

	function sendMessage(text) {
		const message = {
			message_id: Math.floor(Math.random() * -10000), // random placeholder message_id
			room_id,
			username,
			text,
		};

		// Send message on socket
		socket.emit(NEW_CHAT_MESSAGE_EVENT, message);

		// Add message to messages
		receiveMessage(message);
	}

	return { sendMessage };
}

export default useChat;
