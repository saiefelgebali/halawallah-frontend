import React, { useCallback, useRef } from "react";
import { useQuery } from "@apollo/client";
import styles from "./ChatPage.module.scss";
import { CHAT_ROOMS } from "../../graphql/query";
import LoadingElipses from "../../components/LoadingElipses/LoadingElipses";

import ChatRoom from "./components/ChatRoom/ChatRoom";

function ChatPage() {
	/**
	 * Handle pagination of chatRooms
	 */
	const { data, loading, fetchMore } = useQuery(CHAT_ROOMS, {
		variables: { offset: 0, limit: 10 },
		fetchPolicy: "network-first",
		notifyOnNetworkStatusChange: true,
	});

	const hasMore = data?.getProfileChatRooms?.hasMore;
	const chatRooms = data?.getProfileChatRooms?.data;

	// Infinite scroll
	const observer = useRef();

	const observerRef = useCallback(
		(node) => {
			// Cancel if still loading
			if (loading || !chatRooms) return;

			// Stop observing if hasMore is false
			if (!hasMore) return;

			// Remove observer from old node
			if (observer.current) observer.current.disconnect();

			// Detect if observer enters viewport
			observer.current = new IntersectionObserver((entries) => {
				// Check if intersecting
				if (!entries[0].isIntersecting) return;

				fetchMore({
					variables: {
						offset: chatRooms.length,
					},
				});
			});

			// Add observer to new node
			if (node) observer.current.observe(node);
		},
		[chatRooms, hasMore, loading, fetchMore]
	);

	// Map chat rooms
	const ChatRooms = () => {
		// Determine which index to be observer
		const observerIndex = Math.floor(chatRooms.length * 0.8);

		return chatRooms.map((room, index) => {
			return (
				<ChatRoom
					key={room.room_id}
					room={room}
					observerRef={
						index + 1 === observerIndex ? observerRef : null
					}
				/>
			);
		});
	};

	// Show loading elipses
	const Loading = () => (
		<div className={styles.loading}>
			<LoadingElipses className={styles.loadingElipses} />
		</div>
	);

	return (
		<div className={styles.chatPage}>
			<h1 className={styles.title}>Messages</h1>
			<div className={styles.chatRooms}>
				{data && <ChatRooms />}
				{loading && <Loading />}
			</div>
		</div>
	);
}

export default ChatPage;
