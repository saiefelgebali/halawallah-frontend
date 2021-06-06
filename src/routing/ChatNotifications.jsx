import { useEffect } from "react";
import useChat from "../hooks/useChat";
import useNotification from "../hooks/useNotification";

function ChatNotifications({ children }) {
	// Hook allows use of the Notification API in app
	const { sendNotification } = useNotification();

	// Return newMessage data on suscription push
	const { newMessage, clearMessage } = useChat();

	useEffect(() => {
		if (!newMessage) return;

		function handleMessage() {
			// Get image of room
			const roomImage =
				newMessage.room.public?.image || newMessage.room.private?.pfp;

			// Send notification on new message received
			sendNotification({
				title: newMessage.username,
				body: newMessage.text,
				tag: newMessage.room.room_id,
				renotify: true,
				silent: true,
				icon: roomImage,
			});

			clearMessage();
		}
		handleMessage();
	}, [newMessage, clearMessage, sendNotification]);

	return children;
}

export default ChatNotifications;
