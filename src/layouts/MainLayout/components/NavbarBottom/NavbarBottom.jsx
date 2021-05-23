import React, { useContext } from "react";
import { ProfileContext } from "../../../../context/profileContext";
import Navbar from "../../../../components/Navbar/Navbar";
import ProfilePicture from "../../../../components/ProfilePicture/ProfilePicture";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

function NavbarBottom() {
	const me = useContext(ProfileContext);
	console.log(me);
	return (
		<Navbar bottom>
			<Link to='/home'>
				<FontAwesomeIcon icon={faHome} />
			</Link>
			<Link to='/search'>
				<FontAwesomeIcon icon={faSearch} />
			</Link>
			<Link to='/create'>
				<FontAwesomeIcon icon={faPlus} />
			</Link>
			<ProfilePicture username={me?.user?.username} src={me?.pfp} />
		</Navbar>
	);
}

export default NavbarBottom;
