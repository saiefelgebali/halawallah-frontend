import React from "react";
import LoadingElipses from "../../components/LoadingElipses/LoadingElipses";
import styles from "./AuthLayout.module.scss";

function AuthLayout({ title, loading, children }) {
	return (
		<div className={styles.auth}>
			<div className={styles.content}>
				<div className={styles.title}>
					<h1>{title}</h1>
					{loading ? <LoadingElipses /> : null}
				</div>
				<div className={styles.form}>{children}</div>
			</div>
		</div>
	);
}

export default AuthLayout;
