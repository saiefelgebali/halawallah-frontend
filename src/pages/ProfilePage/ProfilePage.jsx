import React from "react";
// import { useParams } from "react-router";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ProfileBody from "./components/ProfileBody/ProfileBody";
import ProfileHead from "./components/ProfileHead/ProfileHead";
import styles from "./ProfilePage.module.scss";

function ProfilePage() {
	// Username used in url param
	// const { username } = useParams();

	return (
		<MainLayout>
			<div className={styles.profilePage}>
				<ProfileHead />
				<ProfileBody />
			</div>
		</MainLayout>
	);
}

export default ProfilePage;
