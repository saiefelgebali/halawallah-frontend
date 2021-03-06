import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import {
	faCheck,
	faChevronLeft,
	faChevronRight,
	faEllipsisH,
	faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DELETE_POST } from "../../graphql/mutation";
import styles from "./Post.module.scss";
import { useMutation } from "@apollo/client";

function PostOptions({ me, post }) {
	const [open, setOpen] = useState(false);

	// Dont show options if not my post
	if (me.username !== post.profile.username) {
		return null;
	}

	const Menu = () => (
		<div name='main'>
			<div
				leftIcon={faTrash}
				label='Delete'
				rightIcon={faChevronRight}
				gotoMenu='delete'
			/>
		</div>
	);

	const DeleteMenu = () => {
		const [deletePost, { loading }] = useMutation(DELETE_POST, {
			variables: { post_id: post.post_id },
			update(cache, { data: deletePost }) {
				// If delete is successful
				if (deletePost) {
					// Refresh page on success
					window.location.reload();
				}
			},
		});

		if (loading) {
			return (
				<div name='delete' secondary>
					<div leftIcon={faChevronLeft} label='Cancel' />
					<div label='Deleting Post' />
				</div>
			);
		}

		return (
			<div name='delete' secondary>
				<div leftIcon={faChevronLeft} label='Cancel' gotoMenu='main' />
				<div
					leftIcon={faCheck}
					label='Delete Post'
					gotoMenu='main'
					action={() => deletePost()}
				/>
			</div>
		);
	};

	return (
		<div className={styles.options}>
			<Dropdown open={open} setOpen={setOpen}>
				{Menu()}
				{DeleteMenu()}
			</Dropdown>
			<div className={styles.icon} onClick={() => setOpen(true)}>
				<FontAwesomeIcon icon={faEllipsisH} />
			</div>
		</div>
	);
}

export default PostOptions;
