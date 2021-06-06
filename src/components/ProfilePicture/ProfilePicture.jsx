import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./ProfilePicture.module.scss";
import Image from "../Image/Image";

const ProfilePicture = React.memo(({ username, src, block, className }) => {
	// Determine pfp content - placeholder or not
	const Content = () => {
		if (!src) {
			return (
				<FontAwesomeIcon icon={faUser} className={styles.placeholder} />
			);
		}
		return <Image src={src} />;
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
		<Link
			to={`/profile/${username}`}
			className={`${styles.pfp} ${className}`}>
			<Content />
		</Link>
	);
});

export default ProfilePicture;
