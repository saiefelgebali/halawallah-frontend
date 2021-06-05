import React from "react";
import { useQuery } from "@apollo/client";
import styles from "./ChatPage.module.scss";
import { CHAT_ROOMS } from "../../graphql/query";
import LoadingElipses from "../../components/LoadingElipses/LoadingElipses";

import ChatRoom from "./components/ChatRoom/ChatRoom";

function ChatPage() {
	/**
	 * Handle pagination of chatRooms
	 */
	const { data } = useQuery(CHAT_ROOMS, {
		fetchPolicy: "cache-and-network",
	});

	const chatRooms = data?.getProfileChatRooms;

	// Map chat rooms
	const ChatRooms = () => {
		// Determine which index to be observer
		return chatRooms.map((room, index) => {
			return <ChatRoom key={room.room_id} room={room} />;
		});
	};

	// Show loading elipses
	const Loading = () => {
		if (data) return null;

		return (
			<div className={styles.loading}>
				<LoadingElipses className={styles.loadingElipses} />
			</div>
		);
	};

	return (
		<div className={styles.chatPage}>
			<h1 className={styles.title}>Messages</h1>
			<div className={styles.chatRooms}>
				{data && <ChatRooms />}
				<Loading />
			</div>
		</div>
	);
}

export default ChatPage;
