// import React, { useState } from "react";
import styles from "./Dropdown.module.scss";

function Dropdown({ open }) {
	// const [activeMenu, setActiveMenu] = useState("main");

	function DropdownItem(props) {
		return (
			<div className={styles.item}>
				{props.leftIcon}
				{props.children}
				{props.rightIcon}
			</div>
		);
	}

	return (
		<div className={styles.dropdown}>
			<div className={styles.menu}>
				<DropdownItem goToMenu='settings'>Wag1</DropdownItem>
				<DropdownItem goToMenu='settings'>Wag2</DropdownItem>
			</div>
		</div>
	);
}

export default Dropdown;
