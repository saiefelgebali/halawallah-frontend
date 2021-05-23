import React from "react";
import styles from "./Navbar.module.scss";

function Navbar({ children, bottom }) {
	return (
		<header className={`${styles.navbar} ${bottom && styles.bottom}`}>
			<div className={styles.content}>{children}</div>
		</header>
	);
}

export default Navbar;
