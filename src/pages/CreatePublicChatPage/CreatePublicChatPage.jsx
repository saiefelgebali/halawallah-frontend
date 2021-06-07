import React, { useState } from "react";
import { faCheck, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./CreatePublicChatPage.module.scss";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { useMutation } from "@apollo/client";
import { CREATE_PUBLIC_CHAT } from "../../graphql/mutation";

function CreatePublicChatPage() {
	// Make mutation to create group chat
	const [createPublicChat, { loading }] = useMutation(CREATE_PUBLIC_CHAT);
	const history = useHistory();

	// Store selected members to be in group chat
	const [members, setMembers] = useState([]);
	const [selectingMembers, setSelectingMembers] = useState(true);

	async function handleSubmitGroupChat(event) {
		event.preventDefault();

		// Get data
		const profileUsernames = members.map((member) => member.username);
		const name = event.target.chatName.value || "New group chat!";

		// Make mutation
		const newPublicChat = await createPublicChat({
			variables: {
				profileUsernames,
				name,
			},
		});

		// Redirect to group chat page
		const room_id = newPublicChat.data.createPublicChat.room_id;
		history.push(`/chat/${room_id}`);

		// Handle errors
	}

	function addMember(member) {
		// Add member to array of members
		setMembers((prev) => [member, ...prev]);
	}

	function removeMember(member) {
		// Remove member to array of members
		setMembers((prev) =>
			prev.filter((prevMember) => prevMember.username !== member.username)
		);
	}

	const Header = () => (
		<div className={styles.header}>
			<h1 className={styles.title}>Start a chat</h1>
			<Link to='/chat' className={styles.link}>
				<FontAwesomeIcon icon={faTimes} className={styles.backButton} />
			</Link>
		</div>
	);

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
			<div onClick={() => addMember(result)} className={styles.result}>
				<ProfilePicture
					username={result.username}
					src={result.pfp}
					block
				/>
				<div className={styles.username}>{result.username}</div>
			</div>
		);
	};

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

		// If still choosing members
		if (selectingMembers) {
			return (
				<div
					className={styles.doneButton}
					onClick={() => setSelectingMembers(false)}>
					<FontAwesomeIcon icon={faCheck} />
				</div>
			);
		}

		// Allow to search for more members
		return (
			<div
				className={styles.addButton}
				onClick={() => setSelectingMembers(true)}>
				<FontAwesomeIcon icon={faPlus} />
			</div>
		);
	};

	const GroupForm = () => {
		// Show form to setup group chat

		return (
			<form className={styles.groupForm} onSubmit={handleSubmitGroupChat}>
				<fieldset disabled={loading}>
					<input
						type='text'
						name='chatName'
						className='form-control mb-3'
						placeholder='Group name'
					/>
					<button className='form-control btn btn-primary'>
						Create Group Chat
					</button>
				</fieldset>
			</form>
		);
	};

	return (
		<div className={styles.createPublicPage}>
			<Header />

			<div className={styles.selectedMembers}>
				<SelectedMembers />
				<MembersControl />
			</div>

			<div className={styles.search}>
				{selectingMembers ? (
					<SearchBar CustomSearchResult={SearchResult} />
				) : (
					<GroupForm />
				)}
			</div>
		</div>
	);
}

export default CreatePublicChatPage;
