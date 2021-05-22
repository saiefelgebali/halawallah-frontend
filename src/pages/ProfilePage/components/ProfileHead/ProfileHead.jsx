import React from "react";
import styles from "./ProfileHead.module.scss";

function ProfileHead({ profile }) {
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
