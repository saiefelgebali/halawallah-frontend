import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Logo from "../../../../assets/Logo";

function NavbarTop() {
	return (
		<Navbar>
			<a href='/home'>
				<Logo />
			</a>
			<Link to={"/chat"}>
				<FontAwesomeIcon icon={faComments} />
			</Link>
		</Navbar>
	);
}

export default NavbarTop;
