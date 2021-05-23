import React from "react";
import NavbarTop from "./components/NavbarTop/NavbarTop";
import NavbarBottom from "./components/NavbarBottom/NavbarBottom";
import SidebarMisc from "./components/SidebarMisc/SidebarMisc";
import SidebarNav from "./components/SidebarNav/SidebarNav";
import styles from "./Main.module.scss";

function MainLayout({ children }) {
	return (
		<div className={styles.main}>
			<SidebarNav />
			<NavbarTop />
			<NavbarBottom />

			<div className={styles.content}>{children}</div>

			<SidebarMisc />
		</div>
	);
}

export default MainLayout;
