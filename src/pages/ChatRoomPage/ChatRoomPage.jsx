import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import styles from "./ChatRoomPage.module.scss";
import ChatRoomDetails from "./components/ChatRoomDetails/ChatRoomDetails";
import ChatRoomMessages from "./components/ChatRoomMessages/ChatRoomMessages";
import ChatUsers from "./components/ChatUsers/ChatUsers";
import UserInput from "./components/UserInput/UserInput";
import { CHAT_ROOM } from "../../graphql/query";

function ChatRoomPage() {
	const params = useParams();
	const room_id = parseInt(params.room_id);

	// Query for room details
	const { data } = useQuery(CHAT_ROOM, {
		variables: {
			room_id,
		},
	});

	// Get chatRoom data
	const chatRoom = data?.getChatRoomById;

	if (!room_id) return null;

	return (
		<div className={styles.chatRoom}>
			<ChatRoomDetails className={styles.header} chatRoom={chatRoom} />
			<div className={styles.content}>
				<ChatRoomMessages room_id={room_id} />
				<ChatUsers room_id={room_id} />
			</div>
			<UserInput className={styles.userInput} room_id={room_id} />
		</div>
	);
}

export default ChatRoomPage;
