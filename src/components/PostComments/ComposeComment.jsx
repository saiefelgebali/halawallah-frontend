import React, { useContext } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../graphql/mutation";
import { POST_COMMENTS } from "../../graphql/query";
import styles from "./ComposeComment.module.scss";
import { ProfileContext } from "../../context/profileContext";

function ComposeComment({ post }) {
	const profileContext = useContext(ProfileContext);

	// Mutation to create a new comment
	const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
		// update function: runs when mutation is finished
		update(cache, { data: { createComment } }) {
			// Read current comments data from cache
			const { getCommentsByPost } = cache.readQuery({
				query: POST_COMMENTS,
				variables: { post_id: post.post_id },
			});

			// Add newly created comment to top of comments array
			const newData = {
				getCommentsByPost: {
					...getCommentsByPost,
					count: getCommentsByPost.count + 1,
					data: [createComment, ...getCommentsByPost.data],
				},
			};

			// Write this new query to cache
			cache.writeQuery({
				query: POST_COMMENTS,
				variables: { post_id: post.post_id },
				data: newData,
			});
		},
	});

	// execute mutation on submit
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

			// Optimistic Response - Zero latency response
			optimisticResponse: {
				createComment: {
					comment_id: Math.random() * -1000,
					username: profileContext.username,
					text,
					__typename: "Comment",
				},
			},
		});

		// Reset form
		event.target.reset();
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
					<button className='form-control btn btn-primary'>
						Comment!
					</button>
				</fieldset>
			</form>
		</div>
	);
}

export default ComposeComment;
