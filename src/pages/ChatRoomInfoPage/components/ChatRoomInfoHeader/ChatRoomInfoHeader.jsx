import { useMutation } from "@apollo/client";
import {
	faArrowLeft,
	faCheck,
	faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Navbar from "../../../../components/Navbar/Navbar";
import { UPDATE_CHAT_NAME } from "../../../../graphql/mutation";
import styles from "./ChatRoomInfoHeader.module.scss";

function ChatRoomInfoHeader({ chatRoom, className }) {
	const history = useHistory();

	const [updateChatRoom] = useMutation(UPDATE_CHAT_NAME, {
		variables: { room_id: chatRoom.room_id },
	});

	// Filter public chat and private chat
	const chatPublic = chatRoom?.public;
	const chatPrivate = chatRoom?.private;

	const [editingChatName, setEditingChatName] = useState(false);

	function handleUpdateChatName(event) {
		event.preventDefault();

		// Make mutation
		const name = event.target.name.value;

		updateChatRoom({
			variables: {
				name,
			},
		});

		// Reset state
		setEditingChatName(false);
	}

	const EditChatName = () => {
		if (!editingChatName) {
			return (
				<>
					<div className={styles.roomName}>
						{chatPublic?.name || chatPrivate?.username}
					</div>
					<FontAwesomeIcon
						icon={faEdit}
						className={styles.editButton}
						onClick={() => setEditingChatName(true)}
					/>
				</>
			);
		}

		return (
			<form onSubmit={handleUpdateChatName}>
				<input
					className='form-control'
					type='text'
					name='name'
					defaultValue={chatPublic?.name || chatPrivate?.username}
				/>
				<button className={styles.doneButton}>
					<FontAwesomeIcon icon={faCheck} />
				</button>
			</form>
		);
	};

	return (
		<Navbar className={`${className} ${styles.chatRoomInfoHeader}`}>
			<div className={styles.backButton} onClick={() => history.goBack()}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
			<div className={styles.details}>
				<EditChatName />
			</div>
		</Navbar>
	);
}

export default ChatRoomInfoHeader;
