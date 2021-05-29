import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";
import ComposeComment from "./ComposeComment";
import LoadingElipses from "../LoadingElipses/LoadingElipses";
import styles from "./PostComments.module.scss";
import { useQuery } from "@apollo/client";
import { POST_COMMENTS } from "../../graphql/query";

function PostComments({ post }) {
	// Max comments from a single query
	const { data, loading, fetchMore } = useQuery(POST_COMMENTS, {
		variables: { post_id: post.post_id, offset: 0, limit: 10 },
		notifyOnNetworkStatusChange: true,
	});

	const comments = data?.getCommentsByPost?.data;
	const count = data?.getCommentsByPost?.count;
	const hasMore = data?.getCommentsByPost?.hasMore;

	// Handle UI
	const [collapsed, setCollapsed] = useState(true);
	const toggleCollapsed = () => setCollapsed((prev) => !prev);

	const ShowMore = () => {
		if (!hasMore || loading) return null;

		// Fetch more comments on button click
		function handleShowMore() {
			fetchMore({
				variables: { offset: comments.length },
			});
		}

		return (
			<div className={styles.showMore} onClick={handleShowMore}>
				Show more
			</div>
		);
	};

	const Loading = () => {
		if (!loading) return null;
		return (
			<div className={styles.loading}>
				<LoadingElipses />
			</div>
		);
	};

	const Header = () => {
		return (
			<div className={styles.header} onClick={toggleCollapsed}>
				<div>{`Comments (${count || post.comments.count})`}</div>
				<div className={styles.arrow}>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			</div>
		);
	};

	return (
		<div className={`${styles.comments} ${collapsed && styles.collapsed}`}>
			<Header />
			<div className={styles.section}>
				<ComposeComment post={post} />
				<div className={styles.list}>
					<Comments comments={comments} />
					<ShowMore />
					<Loading />
				</div>
			</div>
		</div>
	);
}

export default PostComments;
