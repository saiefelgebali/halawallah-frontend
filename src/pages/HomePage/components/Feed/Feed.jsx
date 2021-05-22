import { useQuery } from "@apollo/client";
import React from "react";
import Post from "../../../../components/Post/Post";
import { FEED } from "../../../../graphql/query";

function Feed() {
	const { data, fetchMore } = useQuery(FEED, {
		variables: {
			offset: 0,
			limit: 10,
		},
		fetchPolicy: "cache-first",
		nextFetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});

	const Posts = () => {
		if (!data) {
			return null;
		}
		console.log(data);
		return data.feed.data.map((post) => (
			<Post key={post.post_id} post={post} />
		));
	};

	return (
		<div>
			<Posts />
			<button
				className='btn btn-secondary'
				onClick={() => {
					const offset = data.feed.data.length;
					fetchMore({
						variables: { offset },
					});
				}}>
				Get More g
			</button>
		</div>
	);
}

export default Feed;
