import { useQuery } from "@apollo/client";
import React from "react";
import { PROFILE_DETAILS } from "../../../../graphql/query";
import styles from "./ProfileHead.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function ProfileHead({ username }) {
	const { data } = useQuery(PROFILE_DETAILS, {
		variables: { username },
		fetchPolicy: "cache-first",
	});

	const profile = data?.getProfileByUsername;

	const ProfileDetails = () => {
		if (!profile) return null;

		// Return profile detils
		return (
			<div className={styles.head}>
				<div className={styles.profile}>
					<div className={styles.pfp}>
						{profile.pfp ? (
							<img src={profile.pfp} alt='' />
						) : (
							<FontAwesomeIcon
								icon={faUser}
								className={styles.placeholder}
							/>
						)}
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
			<ProfileDetails />
		</>
	);
}

export default ProfileHead;
