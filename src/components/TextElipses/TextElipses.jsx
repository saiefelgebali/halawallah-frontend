import React from "react";
import styles from "./TextElipses.module.scss";

function TextElipses({ text, className }) {
	return (
		<span>
			{text}
			<span className={styles.dot1}>.</span>
			<span className={styles.dot2}>.</span>
			<span className={styles.dot3}>.</span>
		</span>
	);
}

export default TextElipses;
