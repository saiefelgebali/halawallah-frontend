import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../../../assets/Logo";

function NavbarTop() {
	return (
		<Navbar>
			<a href='/home'>
				<Logo />
			</a>
			<div>
				<FontAwesomeIcon icon={faComments} />
			</div>
		</Navbar>
	);
}

export default NavbarTop;
