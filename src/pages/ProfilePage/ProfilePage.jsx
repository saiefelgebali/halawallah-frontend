import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { PROFILE } from "../../graphql/query";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ProfileBody from "./components/ProfileBody/ProfileBody";
import ProfileHead from "./components/ProfileHead/ProfileHead";
import styles from "./ProfilePage.module.scss";

function ProfilePage() {
	// Username used in url param
	const { username } = useParams();

	// GraphQL Query
	const { data, loading, error } = useQuery(PROFILE, {
		variables: { username, offset: 0, limit: 100 },
		fetchPolicy: "cache-first",
	});

	const profile = data?.getProfileByUsername;

	// When Loading
	const Loading = () => <div>Loading</div>;
	// When Loading
	const Error = () => <div>Error</div>;

	// Loaded Profile Page
	const Profile = () => (
		<div className={styles.profilePage}>
			<ProfileHead profile={profile} />
			<ProfileBody profile={profile} />
		</div>
	);

	return (
		<MainLayout>
			{loading && <Loading />}
			{error && <Error />}
			{profile && <Profile />}
		</MainLayout>
	);
}

export default ProfilePage;
