import { useQuery } from "@apollo/client";
import React from "react";
import { PROFILE_DETAILS } from "../../../../graphql/query";
import styles from "./ProfileHead.module.scss";

function ProfileHead({ username }) {
	const { data, loading } = useQuery(PROFILE_DETAILS, {
		variables: { username },
		fetchPolicy: "cache-first",
	});

	const profile = data?.getProfileByUsername;

	if (loading) return <div>Loading</div>;

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
				<button className={`btn btn-secondary ${styles.editButton}`}>
					Settings
				</button>
			</div>
		</div>
	);
}

export default ProfileHead;
