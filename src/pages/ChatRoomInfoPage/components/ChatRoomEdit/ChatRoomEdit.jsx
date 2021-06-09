import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ChatRoomEditImage from "../ChatRoomEditImage/ChatRoomEditImage";
import styles from "./ChatRoomEdit.module.scss";

function ChatRoomEdit({ chatRoom }) {
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

	const Member = ({ member }) => (
		<Link className={styles.member} to={`/profile/${member.username}`}>
			<div className={styles.pfp}>
				<MemberImage member={member} />
			</div>
			<div className={styles.username}>{member.username}</div>
		</Link>
	);

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
