import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ProfileHead.module.scss";

function ProfilePicture({ profile, src }) {
	// Show specific image
	if (src) return <img src={src} alt='' />;
	// Show profile pfp
	else if (profile) return <img src={profile.pfp} alt='' />;
	// Show generic pfp
	return <FontAwesomeIcon icon={faUser} className={styles.placeholder} />;
}

export default ProfilePicture;
