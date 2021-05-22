import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Post from "../../../../components/Post/Post";
import { FEED } from "../../../../graphql/query";

function Feed() {
	const { data } = useQuery(FEED, { variables: { offset: 0, limit: 5 } });
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		// Cancel if no data
		if (!data || !data.feed.data) return;

		// Handle new posts
		setPosts((prevPosts) => [...prevPosts, ...data.feed.data]);
	}, [data, setPosts]);

	// if (posts.length === 0) return null;

	const Posts = () => {
		return posts.map((post) => <Post key={post.post_id} post={post} />);
	};

	return (
		<div>
			<Posts />
		</div>
	);
}

export default Feed;
