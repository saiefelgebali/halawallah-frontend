import React from "react";
import { useQuery } from "@apollo/client";
import styles from "./ChatPage.module.scss";
import { CHAT_ROOMS } from "../../graphql/query";
import LoadingElipses from "../../components/LoadingElipses/LoadingElipses";

import ChatRoom from "./components/ChatRoom/ChatRoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
		// Order rooms by latestMessage
		const compareChatRooms = (a, b) => {
			// Access timestamps, convert to dates
			const dateA = new Date(parseInt(a.messages.data[0]?.created_at));
			const dateB = new Date(parseInt(b.messages.data[0]?.created_at));

			// Order by ascending timestamps
			const diff = dateB - dateA;

			if (Number.isNaN(diff)) {
				return 0;
			}

			return diff;
		};

		// Return sorted chatRooms
		const sortedChatRooms = chatRooms.slice().sort(compareChatRooms);

		return sortedChatRooms.map((room, index) => {
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
			<div className={styles.header}>
				<h1 className={styles.title}>Messages</h1>
				<Link to='/create/chat' className={styles.link}>
					<FontAwesomeIcon
						icon={faPlusCircle}
						className={styles.addButton}
					/>
				</Link>
			</div>
			<div className={styles.chatRooms}>
				{data && <ChatRooms />}
				<Loading />
			</div>
		</div>
	);
}

export default ChatPage;
