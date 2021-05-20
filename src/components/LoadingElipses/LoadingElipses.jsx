import React from "react";
import styles from "./LoadingElipses.module.scss";

function LoadingElipses() {
	return (
		<div className={styles["lds-ellipsis"]}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default LoadingElipses;
