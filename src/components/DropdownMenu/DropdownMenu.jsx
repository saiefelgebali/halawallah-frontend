import React from "react";
import styles from "./DropdownMenu.module.scss";

function DropdownMenu({ children }) {
	return <div className={styles.menu}>{children}</div>;
}

export default DropdownMenu;
