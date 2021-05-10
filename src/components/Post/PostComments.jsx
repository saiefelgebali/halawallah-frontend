import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Username from "../_shared/Username";
import styles from "./PostComments.module.scss";

// Maps out comments
// Handle pagination
const Comments = () => {
	return (
		<div className={styles.list}>
			<Comment />
			<Comment />
			<Comment />
			<div className={styles["show-more"]}>Show more</div>
		</div>
	);
};

const Comment = () => {
	return (
		<div className={styles.comment}>
			<Username username='commenter' className={styles.username} />
			<span>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam,
				ad iusto quos porro ducimus veritatis quisquam perferendis
				corrupti quidem exercitationem architecto. Dicta nostrum
				exercitationem eveniet quaerat quidem. Officia, asperiores id!
			</span>
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

function PostComments() {
	// Comment section is active state
	const [collapsed, setCollapsed] = useState(true);
	const toggleCollapsed = () => setCollapsed((prev) => !prev);

	return (
		<div
			className={`${styles.comments} ${
				collapsed ? styles.collapsed : ""
			}`}>
			<div className={styles.header} onClick={toggleCollapsed}>
				<div>Comments (0)</div>
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
