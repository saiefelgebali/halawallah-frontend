import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfilePicture.module.scss";

const ProfilePicture = ({ username, src }) => {
	if (!src) {
		return (
			<Link to={`/profile/${username}`} className={styles.pfp}>
				<FontAwesomeIcon icon={faUser} className={styles.placeholder} />
			</Link>
		);
	}
	return (
		<Link to={`/profile/${username}`} className={styles.pfp}>
			<img src={src} alt='' />
		</Link>
	);
};

export default ProfilePicture;
