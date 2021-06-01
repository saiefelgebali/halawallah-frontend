import { useQuery } from "@apollo/client";
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { ProfileContext } from "../../../../context/profileContext";
import { CHAT_ROOM_MESSAGES } from "../../../../graphql/query";
import styles from "./ChatRoomMessages.module.scss";

function ChatRoomMessages({ room_id }) {
	const profileContext = useContext(ProfileContext);

	const messagesContainerRef = useRef();

	// Query for room messages
	const { data, loading, fetchMore } = useQuery(CHAT_ROOM_MESSAGES, {
		variables: {
			room_id: parseInt(room_id),
			offset: 0,
			limit: 11,
		},
		notifyOnNetworkStatusChange: true,
	});

	// Messages from chatRoom
	const hasMore = data?.getChatRoomMessages?.hasMore;

	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (!data) return;

		// Scroll to bottom on initial load
		setMessages(data.getChatRoomMessages.data);
	}, [data]);

	// Infinite scroll
	const observer = useRef();

	const observerRef = useCallback(
		(node) => {
			// Cancel if still loading
			if (loading || !messages) return;

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
						offset: messages.length,
					},
				});
			});

			// Add observer to new node
			if (node) observer.current.observe(node);
		},
		[messages, hasMore, loading, fetchMore]
	);

	const Message = ({ message, observerRef }) => {
		const myMessage = message.profile.username === profileContext.username;

		return (
			<div
				className={`${styles.message} ${
					myMessage ? styles.myMessage : styles.otherMessage
				}`}
				ref={observerRef}>
				<div className={styles.username}>
					{message.profile.username}
				</div>
				<div className={styles.text}>{message.text}</div>
			</div>
		);
	};

	const Messages = () => {
		// Threshold to start loading more
		const observerIndex = Math.floor(messages.length * 0.8);

		return messages.map((message, index) => (
			<Message
				key={message.message_id}
				message={message}
				// observerRef={index + 1 === observerIndex ? observerRef : null}
			/>
		));
	};

	const Loading = () => <div>Loading...</div>;

	return (
		<div className={styles.messages} ref={messagesContainerRef}>
			{messages && <Messages />}
			{loading && <Loading />}
		</div>
	);
}

export default ChatRoomMessages;
