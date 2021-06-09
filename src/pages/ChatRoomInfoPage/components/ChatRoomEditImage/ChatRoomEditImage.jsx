import { useQuery } from "@apollo/client";
import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { uploadPublicChatImage } from "../../../../api/upload";
import { CHAT_ROOM } from "../../../../graphql/query";
import styles from "./ChatRoomEditImage.module.scss";

function ChatRoomEditImage({ chatRoom }) {
	const [preview, setPreview] = useState({ link: null, file: null });
	const [loading, setLoading] = useState(false);

	const { refetch } = useQuery(CHAT_ROOM, {
		variables: {
			room_id: chatRoom.room_id,
		},
	});

	function handleImageInput(event) {
		// Get preview image
		const files = event.target.files;

		// Validate file input
		if (!files || !files.length) {
			return;
		}

		// Access file and convert to image
		const targetFile = files[0];
		const previewImageLink = URL.createObjectURL(targetFile);

		// Set state
		setPreview((prev) => ({ link: previewImageLink, file: targetFile }));
	}

	async function handleImageUpload() {
		// Upload image
		setLoading(true);
		await uploadPublicChatImage({
			image: preview.file,
			room_id: chatRoom.room_id,
		});

		// Update cache
		refetch();

		// Reset state
		setPreview({});
		setLoading(false);
	}

	// Filter public chat and private chat
	const chatPublic = chatRoom?.public;
	const chatPrivate = chatRoom?.private;

	const Image = () => {
		if (preview.link || chatPublic?.image || chatPrivate?.pfp) {
			return (
				<img
					src={preview.link || chatPublic?.image || chatPrivate?.pfp}
					alt=''
				/>
			);
		}

		return <img src='https://i.stack.imgur.com/y9DpT.jpg' alt='' />;
	};

	const ChangeImage = () => (
		<>
			<label htmlFor={styles.imgInput} className={styles.editImage}>
				<FontAwesomeIcon icon={faEdit} />
			</label>
			<input
				id={styles.imgInput}
				type='file'
				accept='.png, .jpg'
				onChange={handleImageInput}
			/>
		</>
	);

	const AcceptImage = () => {
		if (!preview.file) return null;

		if (loading)
			return (
				<div className={styles.loadingImage}>
					<div className={styles.loading}></div>
				</div>
			);

		return (
			<div className={styles.acceptImage} onClick={handleImageUpload}>
				<FontAwesomeIcon icon={faCheck} />
			</div>
		);
	};

	return (
		<div className={styles.image}>
			<Image />
			<ChangeImage />
			<AcceptImage />
		</div>
	);
}

export default ChatRoomEditImage;
