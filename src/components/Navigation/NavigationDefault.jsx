import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faComments,
	faHome,
	faPlus,
	faSearch,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./NavigationDefault.scss";

// Menu Setup
const PagesMenu = () => (
	<div className='menu'>
		<div className='item'>
			<div className='content'>
				<div className='icon'>
					<div className='hw-logo'>هلا</div>
				</div>
				<div className='label'>Hala Wallah</div>
			</div>
		</div>
		<MenuItem icon={faHome} label='Home' to='/home' />
		<MenuItem icon={faPlus} label='Create' to='/create' />
		<MenuItem icon={faSearch} label='Search' to='/search' />
		<MenuItem icon={faComments} label='Messages' to='/messages' />
	</div>
);

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

function NavigationDefault() {
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
