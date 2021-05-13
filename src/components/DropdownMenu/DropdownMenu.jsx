import React from "react";
import styles from "./DropdownMenu.module.scss";

function DropdownMenu({ children }) {
	/**
	 * @summary Individual Dropdown Menu. Seperates different menus out.
	 *
	 * @description
	 * - Actual structure is simple.
	 * - Used modularly as child to the Dropdown component.
	 *
	 * @prop {Boolean} secondary - Whether or not menu is a accessed by a primary menu.
	 * @prop {String} name       - The name of the menu, used to navigate the dropdown.
	 */
	return <div className={styles.menu}>{children}</div>;
}

export default DropdownMenu;
