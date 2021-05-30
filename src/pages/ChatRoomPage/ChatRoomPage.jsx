import React from "react";
import { useParams } from "react-router";
import styles from "./ChatRoomPage.module.scss";
import ChatRoomDetails from "./components/ChatRoomDetails/ChatRoomDetails";
import ChatRoomMessages from "./components/ChatRoomMessages/ChatRoomMessages";
import UserInput from "./components/UserInput/UserInput";

function ChatRoomPage() {
	const { room_id } = useParams();

	return (
		<div className={styles.chatRoom}>
			<ChatRoomDetails className={styles.header} />
			<ChatRoomMessages />
			<UserInput className={styles.userInput} />
		</div>
	);
}

export default ChatRoomPage;
