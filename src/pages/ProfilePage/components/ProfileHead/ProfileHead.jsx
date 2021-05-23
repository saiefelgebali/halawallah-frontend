import { useQuery } from "@apollo/client";
import React from "react";
import LoadingElipses from "../../../../components/LoadingElipses/LoadingElipses";
import { PROFILE_DETAILS } from "../../../../graphql/query";
import styles from "./ProfileHead.module.scss";

function ProfileHead({ username }) {
	const { data, loading } = useQuery(PROFILE_DETAILS, {
		variables: { username },
		fetchPolicy: "cache-first",
	});

	const profile = data?.getProfileByUsername;

	const Loading = () => {
		if (!loading) return null;

		// Return a loading elipses styled like a post
		return (
			<div className={styles.loading}>
				<LoadingElipses className={styles.loadingElipses} />
			</div>
		);
	};

	const ProfileDetails = () => {
		if (!profile) return null;

		// Return profile detils
		return (
			<div className={styles.head}>
				<div className={styles.profile}>
					<div className={styles.pfp}>
						<img src={profile.pfp} alt='' />
					</div>
					<div className={styles.details}>
						<div className={styles.display}>{profile.display}</div>
						<div className={styles.username}>
							{profile.user.username}
						</div>
						<div className={styles.bio}>{profile.bio}</div>
					</div>
				</div>
				<div className={styles.controls}>
					<button className={`btn btn-primary ${styles.editButton}`}>
						Edit
					</button>
					<button
						className={`btn btn-secondary ${styles.editButton}`}>
						Settings
					</button>
				</div>
			</div>
		);
	};

	return (
		<>
			<Loading />
			<ProfileDetails />
		</>
	);
}

export default ProfileHead;
