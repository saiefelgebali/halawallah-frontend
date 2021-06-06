import { useEffect, useState } from "react";
import { useHistory } from "react-router";

function useNotification() {
	const [perms, setPerms] = useState();
	const history = useHistory();

	useEffect(() => {
		// Request permission and set state
		const requestPermission = async () => {
			setPerms(await Notification.requestPermission());
		};

		// Request notification permission if available on device
		if ("Notification" in window) {
			requestPermission();
		}
	});

	// Function to show notification
	const sendNotification = ({
		title,
		body,
		icon,
		image,
		tag,
		renotify,
		silent,
	}) => {
		if (!perms) return;

		const notification = new Notification(title, {
			body,
			icon,
			image,
			tag,
			renotify,
			silent,
		});

		notification.addEventListener("click", (event) => {
			// Route to message chat '/chat/room_id'
			history.push(`/chat/${tag}`);
		});
	};

	return { sendNotification };
}

export default useNotification;
