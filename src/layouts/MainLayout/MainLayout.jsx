import React from "react";
import SidebarMisc from "./components/SidebarMisc/SidebarMisc";
import SidebarNav from "./components/SidebarNav/SidebarNav";
import styles from "./Main.module.scss";

function MainLayout({ children }) {
	return (
		<div className={styles.main}>
			<SidebarNav />

			<div className={styles.content}>{children}</div>

			<SidebarMisc />
		</div>
	);
}

export default MainLayout;
