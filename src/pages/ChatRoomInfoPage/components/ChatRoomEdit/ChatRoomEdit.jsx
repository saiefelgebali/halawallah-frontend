import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ChatRoomEditImage from "../ChatRoomEditImage/ChatRoomEditImage";
import { ProfileContext } from "../../../../context/profileContext";
import styles from "./ChatRoomEdit.module.scss";

function ChatRoomEdit({ chatRoom }) {
	const profileContext = useContext(ProfileContext);

	function handleLeaveChat() {
		// Make leave mutation
		// Refresh chatRooms
		// Route to home
	}

	const Members = () =>
		chatRoom.members.map((member) => (
			<Member key={member.username} member={member} />
		));

	const MemberImage = ({ member }) => {
		if (member.pfp) {
			return <img src={member.pfp} alt='' />;
		}

		return <FontAwesomeIcon icon={faUser} />;
	};

	const Member = ({ member }) => {
		return (
			<Link className={styles.member} to={`/profile/${member.username}`}>
				<div className={styles.info}>
					<div className={styles.pfp}>
						<MemberImage member={member} />
					</div>
					<div className={styles.username}>{member.username}</div>
				</div>
				<Controls member={member} />
			</Link>
		);
	};

	const Controls = ({ member }) => {
		if (profileContext.username !== member.username) return null;

		return (
			<div className={styles.controls}>
				<div
					title='Leave chat'
					className={styles.item}
					onClick={handleLeaveChat}>
					<FontAwesomeIcon icon={faSignOutAlt} />
				</div>
			</div>
		);
	};

	return (
		<>
			<ChatRoomEditImage chatRoom={chatRoom} />
			<div className={styles.members}>
				<h4 className={styles.title}>Members</h4>
				<Members />
			</div>
		</>
	);
}

export default ChatRoomEdit;
