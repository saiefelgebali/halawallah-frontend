import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfilePicture.module.scss";

const ProfilePicture = ({ username, src, block }) => {
	// Determine pfp content - placeholder or not
	const Content = () => {
		if (!src) {
			return (
				<FontAwesomeIcon icon={faUser} className={styles.placeholder} />
			);
		}
		return <img src={src} alt='' />;
	};

	// Check if block - (non link)
	if (block) {
		return (
			<div className={styles.pfp}>
				<Content />
			</div>
		);
	}

	// Regular link pfp
	return (
		<Link to={`/profile/${username}`} className={styles.pfp}>
			<Content />
		</Link>
	);
};

export default ProfilePicture;
