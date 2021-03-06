import React, { useCallback, useRef } from "react";
import Post from "../Post/Post";
import PostPreview from "../Post/PostPreview";
import LoadingElipses from "../LoadingElipses/LoadingElipses";
import styles from "./Feed.module.scss";
import { useQuery } from "@apollo/client";

function Feed({ query, variables, grid }) {
	/**
	 * Outputs posts from "feed" param
	 * Handle pagination
	 * Infinite scroll by way of IntersectionObserver
	 */

	const { data, loading, fetchMore } = useQuery(query, {
		variables: {
			...variables,
			offset: 0,
			limit: 6,
		},
		// fetchPolicy: "cache-and-network",
	});

	const paginatedPostsData = (() => {
		if (!data) return null;

		// Return first prop from object
		// eg. "feed" or "getPostsByUsername" objects
		return data[Object.keys(data)[0]];
	})();

	// Extract data
	const feed = paginatedPostsData?.data;
	const hasMore = paginatedPostsData?.hasMore;

	// Infinite scroll
	const observer = useRef();

	const observerRef = useCallback(
		(node) => {
			// Cancel if still loading
			if (loading || !feed) return;

			// Stop observing if hasMore is false
			if (!hasMore) return;

			// Remove observer from old node
			if (observer.current) observer.current.disconnect();

			// Detect if observer enters viewport
			observer.current = new IntersectionObserver((entries) => {
				// Check if intersecting
				if (!entries[0].isIntersecting) return;

				fetchMore({
					variables: {
						offset: feed.length,
					},
				});
			});

			// Add observer to new node
			if (node) observer.current.observe(node);
		},
		[feed, hasMore, loading, fetchMore]
	);

	const PaginatedPosts = () => {
		// Handle undefined feed
		if (!feed) {
			return null;
		}

		// Determine Observer Index - Load on 80% content
		const observerIndex = Math.floor(feed.length * 0.8);

		// Map out posts
		if (grid) {
			return <PostsGrid observerIndex={observerIndex} />;
		}
		return <PostsFeed observerIndex={observerIndex} />;
	};

	// Show posts in a feed
	const PostsFeed = ({ observerIndex }) => (
		<div className={styles.feed}>
			{feed.map((post, index) => (
				<Post
					key={post.post_id}
					post={post}
					// Add observerRef if index matches observerIndex
					observerRef={
						index + 1 === observerIndex ? observerRef : null
					}
				/>
			))}
		</div>
	);

	// Show posts in a grid
	const PostsGrid = ({ observerIndex }) => (
		<div className={styles.grid}>
			{feed.map((post, index) => (
				<PostPreview
					key={post.post_id}
					post={post}
					// Add observerRef if index matches observerIndex
					observerRef={
						index + 1 === observerIndex ? observerRef : null
					}
				/>
			))}
		</div>
	);

	const Loading = () => {
		if (!loading) return null;

		// Return a loading elipses styled like a post
		return (
			<div className={styles.loading}>
				<LoadingElipses className={styles.loadingElipses} />
			</div>
		);
	};

	return (
		<>
			<PaginatedPosts />
			<Loading />
		</>
	);
}

export default Feed;
