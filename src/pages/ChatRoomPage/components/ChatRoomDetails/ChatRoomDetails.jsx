import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import Navbar from "../../../../components/Navbar/Navbar";
import styles from "./ChatRoomDetails.module.scss";

function ChatRoomDetails({ className, chatRoom }) {
	const history = useHistory();

	// Filter public chat and private chat
	const chatPublic = chatRoom?.public;
	const chatPrivate = chatRoom?.private;

	return (
		<Navbar className={`${className} ${styles.chatRoomDetails}`}>
			<div className={styles.backButton} onClick={() => history.goBack()}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
			<div className={styles.details}>
				<div className={styles.roomName}>
					{chatPublic?.name || chatPrivate?.username}
				</div>
				<div className={styles.roomImage}>
					<img src={chatPublic?.image || chatPrivate?.pfp} alt='' />
				</div>
			</div>
		</Navbar>
	);
}

export default ChatRoomDetails;
