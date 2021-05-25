import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Username from "../_shared/Username";
import styles from "./PostComments.module.scss";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/mutation";
import { POST_COMMENTS } from "../../graphql/query";

function PostComments({ post }) {
	// Comment section is active state
	const [collapsed, setCollapsed] = useState(true);
	const toggleCollapsed = () => setCollapsed((prev) => !prev);

	// Maps out comments
	// Handle pagination
	const Comments = () => {
		// Store comment objects
		const [comments, setComments] = useState([]);

		// Fetch post comments
		const queryLimit = 2;
		const { data, fetchMore } = useQuery(POST_COMMENTS, {
			variables: { post_id: post.post_id, offset: 0, limit: queryLimit },
			notifyOnNetworkStatusChange: true,
		});

		useEffect(() => {
			if (!data) return;

			console.log(data.getPostById);

			setComments(data.getPostById.comments.data);
		}, [data]);

		function handleShowMore() {
			fetchMore({
				variables: { limit: 8 },
			});
		}

		return (
			<div className={styles.list}>
				{comments.map((comment) => (
					<Comment key={comment.comment_id} comment={comment} />
				))}
				{data?.getPostById?.comments?.hasMore && (
					<div className={styles.showMore} onClick={handleShowMore}>
						Show more
					</div>
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
		// Create new comment mutation
		const [createComment, { loading }] = useMutation(CREATE_COMMENT);

		async function handleSubmitComment(event) {
			event.preventDefault();

			// Extract user input data
			const formData = new FormData(event.target);
			const text = formData.get("text");

			// Make mutation
			const result = await createComment({
				variables: {
					post_id: post.post_id,
					text,
				},
			});

			console.log(result);
		}

		return (
			<div className={styles.compose}>
				<form onSubmit={handleSubmitComment}>
					<textarea
						name='text'
						cols='30'
						rows='2'
						placeholder='Say Something...'
						className='form-control'></textarea>
					<input
						type='submit'
						className='form-control btn btn-primary'
					/>
				</form>
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
