import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./DropdownItem.module.scss";

function DropdownItem({ left, label, right, leftIcon, rightIcon, input }) {
	// Handle left component icons
	const LeftComponent = () => (
		<div className={styles.left}>
			{leftIcon ? <FontAwesomeIcon icon={leftIcon} /> : left}
		</div>
	);

	// Handle right component icons
	const RightComponent = () => (
		<div className={styles.right}>
			{rightIcon ? <FontAwesomeIcon icon={rightIcon} /> : right}
		</div>
	);

	return (
		<label
			className={styles.item}
			onClick={() => console.log("Do something")}>
			<LeftComponent />
			<div className={styles.label}>{label}</div>
			<RightComponent />
		</label>
	);
}

export default DropdownItem;
