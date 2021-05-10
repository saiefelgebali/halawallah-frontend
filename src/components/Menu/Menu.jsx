import React from "react";
import styles from "./Menu.module.scss";

function Menu({ children }) {
	// Generic menu component
	return <ul className={styles.menu}>{children}</ul>;
}

export default Menu;
