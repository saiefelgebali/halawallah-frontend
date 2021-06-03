import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import styles from "./ChatRoom.module.scss";
import { ProfileContext } from "../../../../context/profileContext";

function ChatRoom({ room }) {
	/**
	 * Show preview of a chatRoom
	 */

	const profileContext = useContext(ProfileContext);

	// Filter group chats from private chats
	const group = room.group;

	// Get other profile in private chat
	const targetProfile =
		!group &&
		room.members.filter(
			(member) => member.username !== profileContext.username
		)[0];

	// Style chatRoom image
	const Image = () => {
		// Group image or targetProfile pfp
		if (group?.image || targetProfile?.pfp) {
			return <img src={group?.image || targetProfile?.pfp} alt='' />;
		}

		// Generic icons
		return <FontAwesomeIcon icon={group ? faUsers : faUser} />;
	};

	// Style a chatRoom's name
	const Name = () => {
		return (
			<div className={styles.name}>
				{group?.name || targetProfile?.username}
			</div>
		);
	};

	// Style latest message on chatRoom preview
	const LatestMessage = () => {
		const latestMessage = room.messages.data[0];
		if (!latestMessage) return null;

		const username =
			latestMessage.profile.username === profileContext.username
				? "You"
				: latestMessage.profile.username;

		return (
			<div className={styles.latestMessage}>
				<span className={styles.username}>{username}:</span>
				<span className={styles.text}>
					{room.messages.data[0]?.text}
				</span>
			</div>
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
				<LatestMessage />
			</div>
		</Link>
	);
}

export default ChatRoom;
