import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MenuItem.module.scss";

const MenuItemIcon = ({ icon }) => {
	// If a valid FontAwesomeIcon is passed, use it
	if (icon && icon.icon && icon.prefix)
		return <FontAwesomeIcon icon={icon} />;
	else return icon;
};

function MenuItem({ icon, label, to, onClick }) {
	// Return a link menu item if a value for 'to' is passed
	if (to) return <MenuItemLink icon={icon} label={label} to={to} />;

	// Return a generic menu item with an onClick function
	return <MenuItemClick icon={icon} label={label} onClick={onClick} />;
}

// Has an onClick function
const MenuItemClick = ({ icon, label, onClick }) => (
	<div className={styles.item} onClick={onClick}>
		<div className={styles.content}>
			<div className={styles.icon}>
				<MenuItemIcon icon={icon} />
			</div>
			<div className={styles.label}>{label}</div>
		</div>
	</div>
);

// When clicked navigates to link
const MenuItemLink = ({ icon, label, to }) => (
	<Link to={to} className={styles.item}>
		<div className={styles.content}>
			<div className={styles.icon}>
				<MenuItemIcon icon={icon} />
			</div>
			<div className={styles.label}>{label}</div>
		</div>
	</Link>
);

export default MenuItem;
