import {
	faCheck,
	faSignOutAlt,
	faTimes,
	faUser,
	faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ChatRoomEditImage from "../ChatRoomEditImage/ChatRoomEditImage";
import { ProfileContext } from "../../../../context/profileContext";
import styles from "./ChatRoomEdit.module.scss";
import { useMutation } from "@apollo/client";
import {
	ADD_MEMBERS_TO_CHAT,
	LEAVE_PUBLIC_CHAT,
} from "../../../../graphql/mutation";
import SearchBar from "../../../../components/SearchBar/SearchBar";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";

function ChatRoomEdit({ chatRoom }) {
	const profileContext = useContext(ProfileContext);
	const history = useHistory();

	const [addingMembers, setAddingMembers] = useState(false);

	// Mutation to leave chat
	const [leaveChat] = useMutation(LEAVE_PUBLIC_CHAT, {
		variables: {
			room_id: chatRoom.room_id,
			username: profileContext.username,
		},
	});

	function handleLeaveChat(event) {
		event.preventDefault();

		// Make leave mutation
		leaveChat();

		// Route to home
		history.push("/chat");
	}

	const MembersHeader = () => {
		return (
			<div className={styles.header}>
				<h4 className={styles.title}>Members</h4>
				<div
					className={styles.addUser}
					onClick={() => setAddingMembers(!addingMembers)}>
					{addingMembers ? (
						<FontAwesomeIcon icon={faTimes} />
					) : (
						<FontAwesomeIcon icon={faUserPlus} />
					)}
				</div>
			</div>
		);
	};

	const Members = () =>
		chatRoom.members.map((member) => (
			<Member key={member.username} member={member} />
		));

	const AddMembers = () => {
		const [members, setMembers] = useState([]);

		const [addMembersToChatRoom] = useMutation(ADD_MEMBERS_TO_CHAT, {
			variables: {
				room_id: chatRoom.room_id,
				usernames: members.map((m) => m.username),
			},
		});

		function addMember(member) {
			// Add member to array of members
			setMembers((prev) => [member, ...prev]);
		}

		function removeMember(member) {
			// Remove member to array of members
			setMembers((prev) =>
				prev.filter(
					(prevMember) => prevMember.username !== member.username
				)
			);
		}

		const SelectedMembers = () =>
			members.map((member, index) => (
				<div
					className={styles.member}
					key={index}
					onClick={() => removeMember(member)}>
					{member.username}
				</div>
			));

		const MembersControl = () => {
			if (!members.length) return null;

			return (
				<div
					className={styles.doneButton}
					onClick={() => addMembersToChatRoom()}>
					<FontAwesomeIcon icon={faCheck} />
				</div>
			);
		};

		const SearchResult = ({ result }) => {
			// Determine if result is already in members array
			const isSelected = members.some(
				(member) => member.username === result.username
			);

			// Show grayed out result with option to remove
			if (isSelected) {
				return (
					<div
						onClick={() => removeMember(result)}
						className={`${styles.result} ${styles.selected}`}>
						<ProfilePicture
							username={result.username}
							src={result.pfp}
							block
						/>
						<div className={styles.username}>{result.username}</div>
					</div>
				);
			}
			return (
				<div
					onClick={() => addMember(result)}
					className={styles.result}>
					<ProfilePicture
						username={result.username}
						src={result.pfp}
						block
					/>
					<div className={styles.username}>{result.username}</div>
				</div>
			);
		};

		return (
			<div className={styles.addMembers}>
				<div className={styles.selectedMembers}>
					<SelectedMembers />
					<MembersControl />
				</div>
				<SearchBar
					// Filter search to not show members in chat already
					filter={(member) =>
						!chatRoom.members
							.map((m) => m.username)
							.includes(member.username)
					}
					CustomSearchResult={SearchResult}
				/>
			</div>
		);
	};

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
				<MembersHeader />
				{addingMembers ? <AddMembers /> : <Members />}
			</div>
		</>
	);
}

export default ChatRoomEdit;
