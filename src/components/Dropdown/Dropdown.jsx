import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownStyles from "./Dropdown.module.scss";
import DropdownItemStyles from "./DropdownItem.module.scss";
import DropdownMenuStyles from "./DropdownMenu.module.scss";
import TransitionMenuPrimary from "./TransitionDropdownMenuPrimary.module.scss";
import TransitionMenuSecondary from "./TransitionDropdownMenuSecondary.module.scss";

function Dropdown({ open, setOpen, over, left, children }) {
	const [activeMenu, setActiveMenu] = useState("main");
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef();
	const menuTransitionTimeout = 250;

	// Setup menu height
	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, []);

	// Enable ways to close dropdown
	useEffect(() => {
		if (open && dropdownRef && dropdownRef.current) {
			addListeners();
		}

		function handleClose(event) {
			// Block if event is targeted at dropdown
			if (
				event.composedPath().includes(dropdownRef.current?.parentNode)
			) {
				return;
			}
			// Close dropdown and remove listeners
			removeListeners();
			setOpen(false);
		}

		function addListeners() {
			document.addEventListener("mouseup", handleClose);
			document.addEventListener("scroll", handleClose);
		}

		function removeListeners() {
			document.removeEventListener("mouseup", handleClose);
			document.removeEventListener("scroll", handleClose);
		}

		return () => removeListeners();
	}, [open, setOpen]);

	// Set dropdown height to height of menu on menu change
	function calculateHeight(element) {
		const height = element.offsetHeight;
		setMenuHeight(height);
	}

	// Local Menu function uses constructed menu passed through children
	const DropdownMenu = ({ children }) => {
		if (!children) return null;

		// Ensure items are in an array
		const ItemsArray = Array.isArray(children) ? children : [children];

		return (
			<div className={DropdownMenuStyles.menu}>
				{ItemsArray.map((item, index) => (
					<DropdownItem item={item.props || {}} key={index} />
				))}
			</div>
		);
	};

	// Local Item uses constructed items passed into Menu through children
	const DropdownItem = ({ item }) => {
		if (!item) return null;

		const { left, right, leftIcon, rightIcon, label, action, gotoMenu } =
			item;

		// Element to be displayed on the left.
		const LeftComponent = () => (
			<div className={DropdownItemStyles.left}>
				{leftIcon ? <FontAwesomeIcon icon={leftIcon} /> : left}
			</div>
		);

		// Element to be displayed on the right.
		const RightComponent = () => (
			<div className={DropdownItemStyles.right}>
				{rightIcon ? <FontAwesomeIcon icon={rightIcon} /> : right}
			</div>
		);

		return (
			<label
				className={DropdownItemStyles.item}
				onClick={() =>
					(action && action()) ||
					(gotoMenu && setActiveMenu(gotoMenu))
				}>
				<LeftComponent />
				<div className={DropdownItemStyles.label}>{label}</div>
				<RightComponent />
			</label>
		);
	};

	// Ensure menus are in an array const MenusArray =
	const MenusArray = Array.isArray(children) ? children : [children];

	const Menus = () =>
		MenusArray.map((menu, index) => {
			return (
				<CSSTransition
					key={index}
					in={activeMenu === menu.props.name}
					timeout={menuTransitionTimeout}
					unmountOnExit
					classNames={
						menu.props.secondary
							? TransitionMenuSecondary
							: TransitionMenuPrimary
					}
					onEnter={calculateHeight}>
					<div>
						<DropdownMenu menu={menu.props}>
							{menu.props.children}
						</DropdownMenu>
					</div>
				</CSSTransition>
			);
		});

	// Class Name for Position
	const dropdownClassName = `${DropdownStyles.dropdown} ${
		over ? DropdownStyles.over : DropdownStyles.under
	} ${left ? DropdownStyles.left : DropdownStyles.right}`;

	return (
		<CSSTransition in={open} timeout={0} unmountOnExit>
			<div
				ref={dropdownRef}
				className={dropdownClassName}
				style={{ height: menuHeight }}>
				{Menus()}
			</div>
		</CSSTransition>
	);
}

export default Dropdown;
