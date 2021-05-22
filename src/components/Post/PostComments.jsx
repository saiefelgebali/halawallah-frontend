import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Username from "../_shared/Username";
import styles from "./PostComments.module.scss";

function PostComments({ post }) {
	// Comment section is active state
	const [collapsed, setCollapsed] = useState(true);
	const toggleCollapsed = () => setCollapsed((prev) => !prev);

	// Store comment objects
	const [comments, setComments] = useState([...post.comments.data]);

	// Maps out comments
	// Handle pagination
	const Comments = () => {
		return (
			<div className={styles.list}>
				{comments.map((comment) => (
					<Comment key={comment.comment_idp} comment={comment} />
				))}
				{post.comments.hasMore && (
					<div className={styles.showMore}>Show more</div>
				)}
			</div>
		);
	};

	const Comment = ({ comment }) => {
		return (
			<div className={styles.comment}>
				<Username
					username={comment.profile.user.username}
					className={styles.username}
				/>
				<span>{comment.text}</span>
			</div>
		);
	};

	const ComposeComment = () => {
		return (
			<div className={styles.compose}>
				<textarea
					name='text'
					id=''
					cols='30'
					rows='2'
					placeholder='Say Something...'
					className='form-control'></textarea>
				<button className='btn btn-primary'>Comment</button>
			</div>
		);
	};

	return (
		<div
			className={`${styles.comments} ${
				collapsed ? styles.collapsed : ""
			}`}>
			<div className={styles.header} onClick={toggleCollapsed}>
				<div>{`Comments (${post.comments.count})`}</div>
				<div className={styles.arrow}>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			</div>
			<div className={styles.section}>
				<ComposeComment />
				<Comments />
			</div>
		</div>
	);
}

export default PostComments;
