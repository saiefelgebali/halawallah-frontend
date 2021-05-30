import React from "react";
import Username from "../_shared/Username";
import styles from "./Comments.module.scss";

// Single comment instance
const Comment = ({ comment }) => {
	return (
		<div className={styles.comment}>
			<Username
				username={comment.profile.username}
				className={styles.username}
			/>
			<span>{comment.text}</span>
		</div>
	);
};

// List of comments
function Comments({ comments }) {
	if (!comments) return null;

	// Map out comments
	return comments.map((comment) => (
		<Comment key={comment.comment_id} comment={comment} />
	));
}

export default Comments;
