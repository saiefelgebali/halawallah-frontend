import React from "react";
import styles from "./Menu.module.scss";

function Menu({ children }) {
	// Generic menu component
	return <div className={styles.menu}>{children}</div>;
}

export default Menu;
