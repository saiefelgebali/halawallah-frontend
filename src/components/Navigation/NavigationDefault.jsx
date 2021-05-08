import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faComment,
	faHome,
	faSearch,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./NavigationDefault.scss";

function NavigationDefault() {
	// Menu Item Layout to be Repeated
	const MenuItem = ({ icon, label, to }) => (
		<Link to={to || "#"} className='item'>
			<div className='content'>
				<div className='icon'>
					<FontAwesomeIcon icon={icon} />
				</div>
				<div className='label'>{label}</div>
			</div>
		</Link>
	);

	// Menu Setup
	const PagesMenu = () => (
		<div className='menu'>
			<MenuItem icon={faHome} label='Hala' to='/home' />
			<MenuItem icon={faHome} label='Home' to='/home' />
			<MenuItem icon={faSearch} label='Search' to='/search' />
			<MenuItem icon={faComment} label='Messages' to='/messages' />
		</div>
	);

	return (
		<header className='sidebar'>
			<div className='banner'>
				<PagesMenu />
				<div className='menu'>
					<MenuItem icon={faUser} label='saiefelgebali' />
				</div>
			</div>
		</header>
	);
}

export default NavigationDefault;
