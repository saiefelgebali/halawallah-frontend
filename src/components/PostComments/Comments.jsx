import { useMutation } from "@apollo/client";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { DELETE_COMMENT } from "../../graphql/mutation";
import Dropdown from "../Dropdown/Dropdown";
import Username from "../_shared/Username";
import { ProfileContext } from "../../context/profileContext";
import styles from "./Comments.module.scss";
import { POST_COMMENTS } from "../../graphql/query";
// import { POST_COMMENTS } from "../../graphql/query";

// Single comment instance
const Comment = ({ comment }) => {
	return (
		<div className={styles.entry}>
			<div className={styles.comment}>
				<Username
					username={comment.profile.username}
					className={styles.username}
				/>
				<span>{comment.text}</span>
			</div>
			<div>
				<CommentOptions comment={comment} />
			</div>
		</div>
	);
};

// Comment options dropdown menu
export const CommentOptions = ({ comment }) => {
	const profileContext = useContext(ProfileContext);

	const [open, setOpen] = useState(false);

	// Mutation and then refetch
	const [deleteComment] = useMutation(DELETE_COMMENT, {
		variables: {
			comment_id: comment.comment_id,
		},
		refetchQueries: [
			{
				query: POST_COMMENTS,
				variables: {
					post_id: comment.post.post_id,
					offset: 0,
					limit: 10,
				},
			},
		],
	});

	// Show main comment options
	const MainMenu = () => (
		<div name='main'>
			<div
				leftIcon={faTrash}
				label='Delete'
				action={() => deleteComment()}
			/>
		</div>
	);

	// Only show options on my comments
	if (comment.profile.username !== profileContext.username) {
		return null;
	}

	return (
		<div className={styles.options}>
			<Dropdown open={open} setOpen={setOpen}>
				{MainMenu()}
			</Dropdown>
			<FontAwesomeIcon
				icon={faEllipsisH}
				className={styles.icon}
				onClick={() => setOpen(true)}
			/>
		</div>
	);
};

// List of comments
function Comments({ comments }) {
	// Map out comments
	return comments.map((comment) => (
		<Comment key={comment.comment_id} comment={comment} />
	));
}

export default Comments;
