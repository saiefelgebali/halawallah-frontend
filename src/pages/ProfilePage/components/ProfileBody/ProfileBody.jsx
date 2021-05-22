import React, { useState } from "react";
import { faLayerGroup, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "../../../../components/Post/Post";
import styles from "./ProfileBody.module.scss";

const Views = {
	Grid: 0,
	Feed: 1,
};

function ProfileBody({ profile }) {
	const [view, setView] = useState(Views.Grid);
	const [posts] = useState([...profile.posts.data]);

	const PostsGrid = () => {
		// Component mapping out posts as previews in a grid
		const Previews = () =>
			posts.map((post) => {
				// Dont show preview if no image
				if (!post.image) return null;

				// Map out post images in grid layout
				return (
					<div key={post.post_id} className={styles.postPreview}>
						<div className={styles.content}>
							<img src={post.image} alt='' />
						</div>
					</div>
				);
			});

		return (
			<div className={`${styles.content} ${styles.grid}`}>
				<Previews />
			</div>
		);
	};

	// Profile Post Feed
	const PostFeed = () => (
		<div className={`${styles.content} ${styles.feed}`}>
			{posts.map((post) => (
				<Post key={post.post_id} post={post} />
			))}
		</div>
	);
	const ProfileContent = () => {
		if (view === Views.Grid) {
			return <PostsGrid />;
		} else if (view === Views.Feed) {
			return <PostFeed />;
		}
	};

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
			<ProfileContent />
		</div>
	);
}

export default ProfileBody;
