import React, { useState } from "react";
import { faLayerGroup, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProfileBody.module.scss";
import Feed from "../../../../components/Feed/Feed";
import { PROFILE_POSTS } from "../../../../graphql/query";

const Views = {
	Grid: 0,
	Feed: 1,
};

function ProfileBody({ username }) {
	const [view, setView] = useState(Views.Grid);

	// Profile Post Feed
	const PostFeed = () => (
		<Feed
			query={PROFILE_POSTS}
			variables={{ username }}
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
