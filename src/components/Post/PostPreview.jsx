import React from "react";
import styles from "./PostPreview.module.scss";

function PostPreview({ post, observerRef }) {
	return (
		<div className={styles.postPreview} ref={observerRef}>
			<div className={styles.content}>
				<img src={post.image} alt='' />
			</div>
		</div>
	);
}

export default PostPreview;
