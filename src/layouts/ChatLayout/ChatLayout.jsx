import React from "react";
import SidebarMisc from "../_components/SidebarMisc/SidebarMisc";
import SidebarNav from "../_components/SidebarNav/SidebarNav";
import styles from "./ChatLayout.module.scss";

function ChatLayout({ children }) {
	return (
		<div className={styles.chat}>
			<SidebarNav />
			<div className={styles.content}>{children}</div>
			<SidebarMisc />
		</div>
	);
}

export default ChatLayout;
