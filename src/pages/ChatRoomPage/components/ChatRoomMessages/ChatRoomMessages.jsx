import { useQuery } from "@apollo/client";
import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import LoadingElipses from "../../../../components/LoadingElipses/LoadingElipses";
import { ProfileContext } from "../../../../context/profileContext";
import { CHAT_ROOM_MESSAGES } from "../../../../graphql/query";
import styles from "./ChatRoomMessages.module.scss";

function ChatRoomMessages({ room_id }) {
	const profileContext = useContext(ProfileContext);

	// Query for room messages
	const { data, loading, fetchMore } = useQuery(CHAT_ROOM_MESSAGES, {
		variables: {
			room_id: parseInt(room_id),
			offset: 0,
			limit: 100,
		},
		fetchPolicy: "network-only",
		nextFetchPolicy: "cache-only",
		notifyOnNetworkStatusChange: true,
	});

	// Messages from chatRoom
	const hasMore = data?.getChatRoomMessages?.hasMore;

	const [messages, setMessages] = useState([]);

	// Keep data up to date
	useEffect(() => {
		if (!data) return;

		// Scroll to bottom on new messages
		window.scrollTo(0, document.body.scrollHeight);
		setMessages(data.getChatRoomMessages.data);
	}, [data]);

	// Maintain scroll position on content load
	const [height, setHeight] = useState(0);

	// Maintain scroll position on content load upwards
	const measuredRef = useCallback(
		(node) => {
			if (!messages) return;

			if (!node) return;

			if (!loading) {
			}

			// Get new height
			const newHeight = node.getBoundingClientRect().height;

			// Calculate difference of height
			const heightDiff = newHeight - height;

			// Scroll down to maintain scroll position
			window.scrollBy({ top: heightDiff });

			// Update height of container div
			setHeight(newHeight);
		},
		[messages, loading, height]
	);

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
		// Check if message belongs to current user
		const myMessage = message.username === profileContext.username;

		return (
			<div
				className={`${styles.message} ${
					myMessage ? styles.myMessage : styles.otherMessage
				}`}
				ref={observerRef}>
				<div className={styles.username}>{message.username}</div>
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
				observerRef={index + 1 === observerIndex ? observerRef : null}
			/>
		));
	};

	const Loading = () => (
		<div className={styles.loading}>
			<LoadingElipses className={styles.loadingElipses} />
		</div>
	);

	return (
		<div className={styles.messages} ref={measuredRef}>
			{messages && <Messages />}
			{loading && <Loading />}
		</div>
	);
}

export default ChatRoomMessages;
