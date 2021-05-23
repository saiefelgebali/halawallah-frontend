import React, { useState } from "react";
import { faLayerGroup, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProfileBody.module.scss";
import Feed from "../../../../components/Feed/Feed";
import { useQuery } from "@apollo/client";
import { PROFILE_POSTS } from "../../../../graphql/query";

const Views = {
	Grid: 0,
	Feed: 1,
};

function ProfileBody({ username }) {
	const [view, setView] = useState(Views.Grid);

	const { data, loading, fetchMore } = useQuery(PROFILE_POSTS, {
		variables: { username, offset: 0, limit: 4 },
		notifyOnNetworkStatusChange: true,
		fetchPolicy: "cache-first",
		nextFetchPolicy: "network-only",
	});

	const feed = data?.getPostsByUsername;

	if (!feed) return null;

	// Profile Post Feed
	const PostFeed = () => (
		<Feed
			feed={feed.data}
			fetchMore={fetchMore}
			hasMore={feed.hasMore}
			loading={loading}
			grid={view === Views.Grid}
		/>
	);

	return (
		<div className={styles.profileBody}>
			<div className={styles.viewSelector}>
				<div
					className={styles.view}
					onClick={() => setView(Views.Grid)}>
					<FontAwesomeIcon icon={faTh} />
				</div>
				<div
					className={styles.view}
					onClick={() => setView(Views.Feed)}>
					<FontAwesomeIcon icon={faLayerGroup} />
				</div>
			</div>
			<PostFeed />
		</div>
	);
}

export default ProfileBody;
