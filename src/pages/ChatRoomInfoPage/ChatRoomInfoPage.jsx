import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import { CHAT_ROOM } from "../../graphql/query";
import styles from "./ChatRoomInfoPage.module.scss";
import ChatRoomEdit from "./components/ChatRoomEdit/ChatRoomEdit";
import ChatRoomInfoHeader from "./components/ChatRoomInfoHeader/ChatRoomInfoHeader";

function ChatRoomInfoPage() {
	const params = useParams();

	// Make sure only one variable is passed
	const room_id = parseInt(params.room_id) || null;
	const username = room_id ? null : params.room_id;

	// Query for room details
	const { data } = useQuery(CHAT_ROOM, {
		variables: {
			room_id,
			username,
		},
	});

	// Get chatRoom data
	const chatRoom = data?.getChatRoom;

	if (!chatRoom) return null;

	return (
		<div className={styles.chatRoomInfoPage}>
			<ChatRoomInfoHeader chatRoom={chatRoom} className={styles.header} />
			<ChatRoomEdit chatRoom={chatRoom} />
		</div>
	);
}

export default ChatRoomInfoPage;
