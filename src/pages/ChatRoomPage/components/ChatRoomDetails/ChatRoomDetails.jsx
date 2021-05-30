import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import Navbar from "../../../../components/Navbar/Navbar";
import styles from "./ChatRoomDetails.module.scss";

function ChatRoomDetails({ className }) {
	const history = useHistory();

	return (
		<Navbar className={className}>
			<div className={styles.button} onClick={() => history.goBack()}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
		</Navbar>
	);
}

export default ChatRoomDetails;
