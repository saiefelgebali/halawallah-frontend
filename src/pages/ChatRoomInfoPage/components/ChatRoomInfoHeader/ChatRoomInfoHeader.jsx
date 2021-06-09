import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useHistory } from "react-router";
import Navbar from "../../../../components/Navbar/Navbar";
import styles from "./ChatRoomInfoHeader.module.scss";

function ChatRoomInfoHeader({ chatRoom, className }) {
	const history = useHistory();

	// Filter public chat and private chat
	const chatPublic = chatRoom?.public;
	const chatPrivate = chatRoom?.private;

	return (
		<Navbar className={`${className} ${styles.chatRoomInfoHeader}`}>
			<div className={styles.backButton} onClick={() => history.goBack()}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
			<div className={styles.details}>
				<div className={styles.roomName}>
					{chatPublic?.name || chatPrivate?.username}
				</div>
			</div>
		</Navbar>
	);
}

export default ChatRoomInfoHeader;
