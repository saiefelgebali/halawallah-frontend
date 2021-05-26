import React, { useEffect, useState } from "react";
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

function PostOptions({ post }) {
	const [open, setOpen] = useState(false);

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
		const [deletePost, { data, loading }] = useMutation(DELETE_POST, {
			variables: { post_id: post.post_id },
		});

		useEffect(() => {
			// Refresh page on success
			if (data && data.deletePost) {
				window.location.reload();
			}
		}, [data]);

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
