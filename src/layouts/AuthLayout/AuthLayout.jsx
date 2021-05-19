import React from "react";
import styles from "./AuthLayout.module.scss";

function AuthLayout({ title, children }) {
	document.body.classList.add("auth");
	return (
		<div className={styles.auth}>
			<div className={styles.content}>
				<div className={styles.title}>
					<h1>{title}</h1>
				</div>
				<div className={styles.form}>{children}</div>
			</div>
		</div>
	);
}

export default AuthLayout;
