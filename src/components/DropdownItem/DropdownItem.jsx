import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./DropdownItem.module.scss";

function DropdownItem({ left, right, leftIcon, rightIcon, label, action }) {
	/**
	 * @summary Individual Dropdown Menu Item
	 *
	 * @description
	 * - A simple three column menu item.
	 * - Left and right sides can contain any JSX Element.
	 * - Alternatively FontAwesome Icon Definitions can be passed in these spaces.
	 * - Center is reserved a label string.
	 * - A function can be passed to handle the onClick event on the main item div.
	 *
	 * @fires onClick
	 *
	 * @prop {JSX.Element}    left      - Element to be displayed on the left.
	 * @prop {JSX.Element}    right     - Element to be displayed on the right.
	 * @prop {IconDefinition} leftIcon  - A FontAwesome IconDefinition overrides `left`.
	 * @prop {IconDefinition} rightIcon - A FontAwesome IconDefinition overrides `right`.
	 * @prop {String}         label     - Text to be displayed in center.
	 * @prop {Function}       action    - onClick event handler.
	 *
	 * @returns {JSX.Element}
	 */

	const LeftComponent = () => (
		<div className={styles.left}>
			{leftIcon ? <FontAwesomeIcon icon={leftIcon} /> : left}
		</div>
	);

	const RightComponent = () => (
		<div className={styles.right}>
			{rightIcon ? <FontAwesomeIcon icon={rightIcon} /> : right}
		</div>
	);

	return (
		<label className={styles.item} onClick={() => action && action()}>
			<LeftComponent />
			<div className={styles.label}>{label}</div>
			<RightComponent />
		</label>
	);
}

export default DropdownItem;
