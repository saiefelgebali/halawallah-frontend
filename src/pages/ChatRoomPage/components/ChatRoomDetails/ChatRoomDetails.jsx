import {
	faArrowLeft,
	faUser,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Navbar from "../../../../components/Navbar/Navbar";
import styles from "./ChatRoomDetails.module.scss";

function ChatRoomDetails({ className, chatRoom }) {
	const history = useHistory();

	// Filter public chat and private chat
	const chatPublic = chatRoom?.public;
	const chatPrivate = chatRoom?.private;

	const Image = () => {
		if (chatPublic?.image || chatPrivate?.pfp) {
			return <img src={chatPublic?.image || chatPrivate?.pfp} alt='' />;
		} else if (chatPublic) {
			return <FontAwesomeIcon icon={faUsers} />;
		} else if (chatPrivate) {
			return <FontAwesomeIcon icon={faUser} />;
		}

		return null;
	};

	const LinkPage = () => {
		// Show link to profile page
		if (chatPrivate) {
			return (
				<Link
					className={styles.roomImage}
					to={`/profile/${chatPrivate.username}`}>
					<Image />
				</Link>
			);
		}

		// Show link to group chat info
		else if (chatPublic) {
			return (
				<div className={styles.roomImage}>
					<Image />
				</div>
			);
		}
		return null;
	};

	return (
		<Navbar className={`${className} ${styles.chatRoomDetails}`}>
			<div className={styles.backButton} onClick={() => history.goBack()}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
			<div className={styles.details}>
				<div className={styles.roomName}>
					{chatPublic?.name || chatPrivate?.username}
				</div>
				<LinkPage />
			</div>
		</Navbar>
	);
}

export default ChatRoomDetails;
