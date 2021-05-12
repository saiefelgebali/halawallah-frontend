import React, { useRef, useEffect } from "react";
import { faCog, faMoon } from "@fortawesome/free-solid-svg-icons";
import styles from "./Dropdown.module.scss";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import DropdownItem from "../DropdownItem/DropdownItem";

function Dropdown({ open, setOpen }) {
	const dropdown = useRef();

	// Handle dropdown exit
	useEffect(() => {
		// Add event listeners if dropdown open
		if (open && dropdown && dropdown.current) {
			addListeners();
		}

		function handleClose(event) {
			// Block if event is targeted at dropdown
			if (event.composedPath().includes(dropdown.current)) {
				return;
			}
			// Close dropdown and remove listeners
			removeListeners();
			setOpen(false);
			// Set dropdown animation
			dropdown.current.classList.add(styles.closed);
		}

		function addListeners() {
			document.addEventListener("click", handleClose);
			document.addEventListener("scroll", handleClose);
		}

		function removeListeners() {
			document.removeEventListener("click", handleClose);
			document.removeEventListener("scroll", handleClose);
		}

		return () => {
			removeListeners();
		};
	}, [open, setOpen]);

	return (
		<div
			ref={dropdown}
			className={`${styles.dropdown} ${open ? styles.open : ""}`}>
			<DropdownMenu>
				<DropdownItem
					leftIcon={faCog}
					label='Settings'
					goToMenu='settings'
				/>
				<DropdownItem leftIcon={faMoon} label='Dark Mode' />
			</DropdownMenu>
		</div>
	);
}

export default Dropdown;
