import React from "react";
import styles from "./Switch.module.scss";

function Switch({ className, checked, onChange }) {
	return (
		<label className={`${styles.switch} ${className}`}>
			<input
				type='checkbox'
				defaultChecked={checked}
				onChange={onChange}
			/>
			<span className={`${styles.slider} ${styles.rounded}`}></span>
		</label>
	);
}

export default Switch;
