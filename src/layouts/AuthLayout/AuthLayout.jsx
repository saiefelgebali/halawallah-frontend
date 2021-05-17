import React from "react";
import styles from "./AuthLayout.module.scss";

function AuthLayout({ children }) {
	return (
		<div className={styles.auth}>
			<div className={styles.content}>{children}</div>
		</div>
	);
}

export default AuthLayout;
