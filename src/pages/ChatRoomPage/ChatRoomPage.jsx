import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import styles from "./ChatRoomPage.module.scss";
import ChatRoomDetails from "./components/ChatRoomDetails/ChatRoomDetails";
import ChatRoomMessages from "./components/ChatRoomMessages/ChatRoomMessages";
import UserInput from "./components/UserInput/UserInput";
import { CHAT_ROOM } from "../../graphql/query";

function ChatRoomPage() {
	const { room_id } = useParams();

	// Query for room details
	const { data, loading, fetchMore } = useQuery(CHAT_ROOM, {
		variables: {
			room_id: parseInt(room_id),
		},
		notifyOnNetworkStatusChange: true,
	});

	// Get chatRoom data
	const chatRoom = data?.getChatRoomById;

	// When user enters a message
	function handleSubmitMessage(event) {
		event.preventDefault();

		// 1. Send send socket event

		// 2. Clear input
	}

	return (
		<div className={styles.chatRoom}>
			<ChatRoomDetails className={styles.header} />
			{chatRoom && <ChatRoomMessages room_id={room_id} />}
			<UserInput
				className={styles.userInput}
				handleSubmit={handleSubmitMessage}
			/>
		</div>
	);
}

export default ChatRoomPage;
