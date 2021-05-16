import React, { useRef, useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import MenuPrimary from "./MenuPrimary.module.scss";
import MenuSecondary from "./MenuSecondary.module.scss";
import styles from "./Dropdown.module.scss";
import dropdownItemStyles from "./DropdownItem.module.scss";
import dropdownMenuStyles from "./DropdownMenu.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function OldDropdown({ activeMenu, children, over, left }) {
	/**
	 * @summary Modular dropdown component, enables dropdown menu UI functionality
	 *
	 * @description
	 * - Visually hidden when not open
	 * - Animations are used
	 * - CSSTransitions are used to animate sub-menu navigation
	 * - Menus can be 2 layers deep & they can link to each other
	 *
	 * @fires onClick  - Used to close dropdown if clicked off of it.
	 * @fires onScroll - Used to close dropdown if clicked off of it.
	 *
	 * @prop {Boolean}  open       - Whether or not dropdown is being used.
	 * @prop {Function} setOpen    - set the open state from parent Element.
	 * @prop {String}   activeMenu - The name of menu that is currently selected.
	 */

	const [open, setOpen] = useState(false);

	// Reference to main dropdown div
	const dropdownRef = useRef();

	// Control and calculate div height to allow for animation
	const [menuHeight, setMenuHeight] = useState(null);

	// Speed of menu transitions
	const transitionTimeout = 250;

	function calculateHeight(element) {
		const height = element.offsetHeight;
		setMenuHeight(height);
	}
	// Handle closing dropdown
	useEffect(() => {
		// Add event listeners if dropdown open
		if (open && dropdownRef && dropdownRef.current) {
			addListeners();
		}

		function handleClose(event) {
			// Block if event is targeted at dropdown
			if (event.composedPath().includes(dropdownRef.current)) {
				return;
			}
			// Close dropdown and remove listeners
			removeListeners();
			setOpen(false);
			// Start dropdown closed animation and hide
			dropdownRef.current.classList.add(styles.closed);
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

	// Add fixed height values to allow transitions
	const inlineStyle = { height: menuHeight };
	// Determine dropdown style - open/closed handling
	const className = `${styles.dropdown} ${open ? styles.open : ""} ${
		over ? styles.over : styles.under
	} ${left ? styles.left : styles.right}`;

	if (Array.isArray(children))
		return (
			<div ref={dropdownRef} className={className} style={inlineStyle}>
				{children.map((menu, index) => {
					return (
						<CSSTransition
							key={index}
							in={activeMenu === menu.props.name}
							unmountOnExit
							timeout={transitionTimeout}
							classNames={
								menu.props.secondary
									? MenuSecondary
									: MenuPrimary
							}
							onEnter={calculateHeight}>
							{menu}
						</CSSTransition>
					);
				})}
			</div>
		);

	// Single Child
	const menu = children;

	return (
		<div ref={dropdownRef} className={className} style={inlineStyle}>
			<CSSTransition
				in={activeMenu === menu.props.name}
				unmountOnExit
				timeout={transitionTimeout}
				classNames={menu.props.secondary ? MenuSecondary : MenuPrimary}
				onEnter={calculateHeight}>
				{menu}
			</CSSTransition>
		</div>
	);
}

function Dropdown({ button, children }) {
	// Children prop is an array of DropdownMenus

	const Menus = () => {
		// Ensure menus are in an array
		const MenusArray = Array.isArray(children) ? children : [children];

		return MenusArray.map((menu, index) => (
			<DropdownMenu menu={menu.props} key={index}>
				{menu.props.children}
			</DropdownMenu>
		));
	};

	// Local Menu function uses constructed menu passed through children
	const DropdownMenu = ({ menu, children }) => {
		if (!children) return null;

		// Ensure items are in an array
		const ItemsArray = Array.isArray(children) ? children : [children];

		return ItemsArray.map((item, index) => (
			<div className={dropdownMenuStyles.menu}>
				<DropdownItem item={item.props} key={index} />
			</div>
		));
	};

	// Local Item uses constructed items passed into Menu through children
	const DropdownItem = ({ item }) => {
		if (!item) return null;

		const { left, right, leftIcon, rightIcon, label, action, gotoMenu } =
			item;

		console.log(item);

		// Element to be displayed on the left.
		const LeftComponent = () => (
			<div className={dropdownItemStyles.left}>
				{leftIcon ? <FontAwesomeIcon icon={leftIcon} /> : left}
			</div>
		);

		// Element to be displayed on the right.
		const RightComponent = () => (
			<div className={dropdownItemStyles.right}>
				{rightIcon ? <FontAwesomeIcon icon={rightIcon} /> : right}
			</div>
		);

		return (
			<label
				className={dropdownItemStyles.item}
				onClick={() => action && action()}>
				<LeftComponent />
				<div className={dropdownItemStyles.label}>{label}</div>
				<RightComponent />
			</label>
		);
	};

	return (
		<>
			<div className={`${styles.dropdown} ${styles.over} ${styles.left}`}>
				<Menus />
			</div>
			{button}
		</>
	);
}

export default Dropdown;
