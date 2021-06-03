import { useSubscription } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../../../../context/profileContext";
import { MESSAGE_TYPING_SUBSCRIPTION } from "../../../../graphql/subscription";
import styles from "./ChatUsers.module.scss";

function ChatUsers({ room_id }) {
	const profileContext = useContext(ProfileContext);

	// State of users who are currently typing
	const [usersTyping, setUsersTyping] = useState([]);

	// Subscribe to message_typing updates
	const { data } = useSubscription(MESSAGE_TYPING_SUBSCRIPTION, {
		variables: {
			room_id,
		},
	});

	useEffect(() => {
		if (!data) return;

		// Get MessageTyping object
		const newMessageTyping = data.messageTyping;

		// Dont add if I am the user
		if (newMessageTyping.username === profileContext.username) return;

		// Add user to usersTyping
		if (newMessageTyping.isTyping) {
			setUsersTyping((prev) => [newMessageTyping, ...prev]);
		}

		// Remove user from usersTyping
		else if (!newMessageTyping.isTyping) {
			setUsersTyping((prev) =>
				prev.filter((m) => m.username !== newMessageTyping.username)
			);
		}
	}, [data, profileContext]);

	// Show users typing message
	const UsersTyping = () => {
		if (!usersTyping.length) return null;

		// Last user who is not myself will be shown
		const displayUser = usersTyping[usersTyping.length - 1];

		console.log(displayUser);
		console.log(usersTyping);

		return (
			<div className={styles.messageTyping}>
				{displayUser.username} is typing...
			</div>
		);
	};

	return (
		<div className={styles.usersTyping}>
			<UsersTyping />
		</div>
	);
}

export default ChatUsers;
