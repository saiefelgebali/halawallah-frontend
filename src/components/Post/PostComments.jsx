import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Username from "../_shared/Username";
import LoadingElipses from "../LoadingElipses/LoadingElipses";
import styles from "./PostComments.module.scss";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/mutation";
import { POST_COMMENTS } from "../../graphql/query";

function PostComments({ post }) {
	// Max comments from a single query
	const queryLimit = 10;

	const { data, loading, fetchMore, refetch } = useQuery(POST_COMMENTS, {
		variables: { post_id: post.post_id, offset: 0, limit: queryLimit },
		notifyOnNetworkStatusChange: true,
	});

	const comments = data?.getCommentsByPost?.data;

	// Handle UI
	const [collapsed, setCollapsed] = useState(true);
	const toggleCollapsed = () => setCollapsed((prev) => !prev);

	const Comments = () => {
		// Maps out comments
		// Handle pagination
		if (!comments) return null;

		return comments.map((comment) => (
			<Comment key={comment.comment_id} comment={comment} />
		));
	};

	const ShowMore = () => {
		function handleShowMore() {
			fetchMore({
				variables: { offset: comments.length },
			});
		}

		return data?.getCommentsByPost?.hasMore && !loading ? (
			<div className={styles.showMore} onClick={handleShowMore}>
				Show more
			</div>
		) : null;
	};

	const Loading = () =>
		loading ? (
			<div>
				<LoadingElipses />
			</div>
		) : null;

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
			await createComment({
				variables: {
					post_id: post.post_id,
					text,
				},
			});

			refetch({
				variables: { offset: 0 },
			});
		}

		return (
			<div className={styles.compose}>
				<form onSubmit={handleSubmitComment}>
					<fieldset disabled={loading}>
						<textarea
							name='text'
							cols='30'
							rows='2'
							placeholder='Say Something...'
							className='form-control'
							required
						/>
						<input
							type='submit'
							className='form-control btn btn-primary'
						/>
					</fieldset>
				</form>
			</div>
		);
	};

	const CommentCount = () => {
		if (!data) {
			return `Comments (${post.comments.count})`;
		}

		return `Comments (${data.getCommentsByPost.count})`;
	};

	return (
		<div
			className={`${styles.comments} ${
				collapsed ? styles.collapsed : ""
			}`}>
			<div className={styles.header} onClick={toggleCollapsed}>
				<CommentCount />
				<div className={styles.arrow}>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			</div>
			<div className={styles.section}>
				<ComposeComment />
				<div className={styles.list}>
					<Comments />
					<ShowMore />
					<Loading />
				</div>
			</div>
		</div>
	);
}

export default PostComments;
