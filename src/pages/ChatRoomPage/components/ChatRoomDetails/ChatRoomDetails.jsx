import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import Navbar from "../../../../components/Navbar/Navbar";
import styles from "./ChatRoomDetails.module.scss";

function ChatRoomDetails({ className }) {
	const history = useHistory();

	return (
		<Navbar className={`${className} ${styles.chatRoomDetails}`}>
			<div className={styles.backButton} onClick={() => history.goBack()}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
			<div className={styles.details}>
				<div className={styles.roomName}>Room Name</div>
				<div className={styles.roomImage}>
					<img
						src='http://192.168.1.111:5000/api/media/img/post/saief-1622375387353.png'
						alt=''
					/>
				</div>
			</div>
		</Navbar>
	);
}

export default ChatRoomDetails;
