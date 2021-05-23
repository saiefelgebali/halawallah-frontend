import React from "react";
import styles from "./LoadingElipses.module.scss";

function LoadingElipses({ className }) {
	return (
		<div className={`${styles.ldsEllipsis} ${className}`}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}

export default LoadingElipses;
