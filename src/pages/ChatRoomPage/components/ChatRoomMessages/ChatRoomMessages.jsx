import React from "react";
import styles from "./ChatRoomMessages.module.scss";

function ChatRoomMessages() {
	// temp
	const messages = [
		{ username: "saief", text: "hello" },
		{ username: "saief", text: "hi" },
		{ username: "saief", text: "goodbye" },
	];

	const Message = ({ message }) => (
		<div className={`${styles.message} ${styles.myMessage}`}>
			<div className={styles.username}>{message.username}</div>
			<div className={styles.text}>{message.text}</div>
		</div>
	);

	const Messages = () =>
		messages.map((message) => <Message message={message} />);

	return (
		<div className={styles.messages}>
			<Messages />
		</div>
	);
}

export default ChatRoomMessages;
