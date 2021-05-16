import React from "react";
import styles from "./Sidebar.module.scss";

function Sidebar({ children }) {
	return (
		<header className={styles.sidebar}>
			<div className={styles.banner}>{children}</div>
		</header>
	);
}

export default Sidebar;
