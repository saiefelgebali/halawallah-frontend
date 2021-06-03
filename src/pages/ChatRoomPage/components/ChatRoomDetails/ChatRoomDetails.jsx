import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useHistory } from "react-router";
import Navbar from "../../../../components/Navbar/Navbar";
import { ProfileContext } from "../../../../context/profileContext";
import styles from "./ChatRoomDetails.module.scss";

function ChatRoomDetails({ className, chatRoom }) {
	const history = useHistory();

	const profileContext = useContext(ProfileContext);

	// If not group get targetProfile
	const targetProfile = chatRoom?.members.filter(
		(member) => member.username !== profileContext.username
	)[0];

	return (
		<Navbar className={`${className} ${styles.chatRoomDetails}`}>
			<div className={styles.backButton} onClick={() => history.goBack()}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
			<div className={styles.details}>
				<div className={styles.roomName}>
					{chatRoom?.group?.name || targetProfile?.username}
				</div>
				<div className={styles.roomImage}>
					<img
						src={chatRoom?.group?.image || targetProfile?.pfp}
						alt=''
					/>
				</div>
			</div>
		</Navbar>
	);
}

export default ChatRoomDetails;
