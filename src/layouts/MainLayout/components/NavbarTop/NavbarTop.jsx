import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faHome } from "@fortawesome/free-solid-svg-icons";

function NavbarTop() {
	return (
		<Navbar>
			<a href='/home'>
				<FontAwesomeIcon icon={faHome} />
			</a>
			<div>
				<FontAwesomeIcon icon={faComments} />
			</div>
		</Navbar>
	);
}

export default NavbarTop;
