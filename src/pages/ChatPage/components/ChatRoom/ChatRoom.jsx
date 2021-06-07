import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import styles from "./ChatRoom.module.scss";
import { ProfileContext } from "../../../../context/profileContext";

const ChatRoom = ({ room }) => {
	/**
	 * Show preview of a chatRoom
	 */

	const profileContext = useContext(ProfileContext);

	// Filter public chats from private chats
	const roomPublic = room.public;

	// Get other profile in private chat
	const roomPrivate = room.private;

	// Style chatRoom image
	const Image = () => {
		// Group image or targetProfile pfp
		if (roomPublic?.image || roomPrivate?.pfp) {
			return <img src={roomPublic?.image || roomPrivate?.pfp} alt='' />;
		}

		// Generic icons
		return <FontAwesomeIcon icon={roomPublic ? faUsers : faUser} />;
	};

	// Style a chatRoom's name
	const Name = () => {
		return (
			<div className={styles.name}>
				{roomPublic?.name || roomPrivate?.username}
			</div>
		);
	};

	// Style latest message on chatRoom preview
	const LatestMessage = () => {
		const latestMessage = room.messages.data[0];
		if (!latestMessage) return null;

		const username =
			latestMessage.username === profileContext.username
				? "You"
				: latestMessage.username;

		return (
			<>
				<span className={styles.username}>{username}:</span>
				<span className={styles.text}>
					{room.messages.data[0]?.text}
				</span>
			</>
		);
	};

	return (
		<Link
			key={room.room_id}
			className={styles.chatRoom}
			to={`/chat/${room.room_id}`}>
			<div className={styles.image}>
				<Image />
			</div>
			<div className={styles.details}>
				<Name />
				<div className={styles.latestMessage}>
					<LatestMessage />
				</div>
			</div>
		</Link>
	);
};

export default ChatRoom;
