import { useEffect } from "react";
import useSound from "use-sound";
import useChat from "../hooks/useChat";
import useNotification from "../hooks/useNotification";

function ChatNotifications({ children }) {
	// Hook allows use of the Notification API in app
	const { sendNotification } = useNotification();

	// Return newMessage data on suscription push
	const { newMessage, clearMessage } = useChat();

	// Enable custom sound effects on message receive
	const [playNewMessageSound] = useSound(
		"/sounds/imessage-notification.mp3",
		{ forceSoundEnabled: true }
	);

	useEffect(() => {
		if (!newMessage) return;

		function handleMessage() {
			// Get image of room
			const roomImage =
				newMessage.room.public?.image || newMessage.room.private?.pfp;

			// Send notification on new message received
			const notification = sendNotification({
				title: newMessage.username,
				body: newMessage.text,
				tag: newMessage.room.room_id,
				renotify: true,
				silent: true,
				icon: roomImage,
			});

			// Play sound on notification show
			notification.onshow = () => {
				playNewMessageSound();
			};

			clearMessage();
		}
		handleMessage();
	}, [newMessage, clearMessage, sendNotification, playNewMessageSound]);

	return children;
}

export default ChatNotifications;
