import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfilePicture.module.scss";

const ProfilePicture = ({ username, src }) => (
	<Link to={`/profile/${username}`} className={styles.pfp}>
		<img src={src} alt='' />
	</Link>
);

export default ProfilePicture;
