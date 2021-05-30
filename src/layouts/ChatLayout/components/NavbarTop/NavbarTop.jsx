import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import styles from "./NavbarTop.module.scss";

function NavbarTop() {
	const history = useHistory();

	return (
		<Navbar>
			<div className={styles.backButton} onClick={() => history.goBack()}>
				<FontAwesomeIcon icon={faArrowLeft} />
			</div>
		</Navbar>
	);
}

export default NavbarTop;
