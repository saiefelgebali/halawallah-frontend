import React from "react";
import styles from "./ChatLayout.module.scss";
import NavbarTop from "./components/NavbarTop/NavbarTop";

function ChatLayout() {
	return (
		<div className={styles.chat}>
			<NavbarTop />
		</div>
	);
}

export default ChatLayout;
