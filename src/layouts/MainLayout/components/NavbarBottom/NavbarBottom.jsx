import React, { useContext } from "react";
import { ProfileContext } from "../../../../context/profileContext";
import Navbar from "../../../../components/Navbar/Navbar";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavbarBottom.module.scss";

function NavbarBottom() {
	const me = useContext(ProfileContext);

	return (
		<Navbar bottom>
			<Link to='/home' className={styles.navItem}>
				<FontAwesomeIcon icon={faHome} />
			</Link>

			<Link to='/search' className={styles.navItem}>
				<FontAwesomeIcon icon={faSearch} />
			</Link>

			<Link to='/create' className={styles.navItem}>
				<FontAwesomeIcon icon={faPlus} />
			</Link>

			<ProfilePicture
				username={me?.username}
				src={me?.pfp}
				className={styles.navItem}
			/>
		</Navbar>
	);
}

export default NavbarBottom;
