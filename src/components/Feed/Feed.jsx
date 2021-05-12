import React from "react";
import Post from "../Post/Post";
import styles from "./Feed.module.scss";

function Feed() {
	return (
		<div className={styles.feed}>
			<Post />
			<Post />
		</div>
	);
}

export default Feed;
