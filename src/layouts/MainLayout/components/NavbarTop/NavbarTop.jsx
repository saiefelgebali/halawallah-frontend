import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets/logo.svg";

function NavbarTop() {
	return (
		<Navbar>
			<a href='/home'>
				<img src={logo} alt='' />
			</a>
			<div>
				<FontAwesomeIcon icon={faComments} />
			</div>
		</Navbar>
	);
}

export default NavbarTop;
