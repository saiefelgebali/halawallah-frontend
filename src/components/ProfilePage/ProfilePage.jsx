import React from "react";
import { useParams } from "react-router";
import styles from "./ProfilePage.module.scss";

function ProfilePage() {
	// Username used in url param
	const { username } = useParams();

	return (
		<div className={styles.profile}>
			<div className={styles.profileHead}>{username}</div>
			<div className={styles.profileContent}>Post 1</div>
		</div>
	);
}

export default ProfilePage;
