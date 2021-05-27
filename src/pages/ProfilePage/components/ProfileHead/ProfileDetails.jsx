import React from "react";
import styles from "./ProfileHead.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileHeadTemplate from "./ProfileHeadTemplate";

// Fetch and show profile information
export function ProfileDetails({ profile, setEditing }) {
	if (!profile) return null;

	const ProfilePicture = () => {
		// Show generic pfp
		if (!profile.pfp) {
			return (
				<FontAwesomeIcon icon={faUser} className={styles.placeholder} />
			);
		}

		// Show profile pfp
		return <img src={profile.pfp} alt='' />;
	};

	const Controls = () => (
		<button className='btn btn-primary' onClick={() => setEditing(true)}>
			Edit
		</button>
	);

	return (
		<ProfileHeadTemplate
			profile={profile}
			pfp={<ProfilePicture />}
			display={profile.display}
			bio={profile.bio}
			controls={<Controls />}
		/>
	);
}

export default ProfileDetails;
