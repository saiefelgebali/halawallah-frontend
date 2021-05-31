import React from "react";
import styles from "./ChatRoomMessages.module.scss";

function ChatRoomMessages() {
	// temp
	const messages = [
		{ message_id: 1, username: "saief", text: "hello" },
		{ message_id: 2, username: "saief", text: "hi" },
		{ message_id: 3, username: "saief", text: "goodbye" },
	];

	const Message = ({ message }) => (
		<div className={`${styles.message} ${styles.myMessage}`}>
			<div className={styles.username}>{message.username}</div>
			<div className={styles.text}>{message.text}</div>
		</div>
	);

	const Messages = () =>
		messages.map((message) => (
			<Message key={message.message_id} message={message} />
		));

	return (
		<div className={styles.messages}>
			<Messages />
		</div>
	);
}

export default ChatRoomMessages;
