import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faHome } from "@fortawesome/free-solid-svg-icons";

function NavbarTop() {
	return (
		<Navbar>
			<div>
				<FontAwesomeIcon icon={faHome} />
			</div>
			<div>
				<FontAwesomeIcon icon={faComments} />
			</div>
		</Navbar>
	);
}

export default NavbarTop;
