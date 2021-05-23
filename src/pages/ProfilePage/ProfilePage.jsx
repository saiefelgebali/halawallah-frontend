import React from "react";
import { useParams } from "react-router";
import ProfileBody from "./components/ProfileBody/ProfileBody";
import ProfileHead from "./components/ProfileHead/ProfileHead";
import styles from "./ProfilePage.module.scss";

function ProfilePage() {
	// Username used in url param
	const { username } = useParams();

	return (
		<div className={styles.profilePage}>
			<ProfileHead username={username} />
			<ProfileBody username={username} />
		</div>
	);
}

export default ProfilePage;
