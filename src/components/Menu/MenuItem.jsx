import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuItem = ({ icon, label, to, onClick }) => {
	// Return a page link menu item if a value for 'to' is passed
	if (to)
		return (
			<Link to={to} className='item'>
				<div className='content'>
					<div className='icon'>
						<FontAwesomeIcon icon={icon} />
					</div>
					<div className='label'>{label}</div>
				</div>
			</Link>
		);

	// Return a generic menu item
	return (
		<div className='item' onClick={onClick}>
			<div className='content'>
				<div className='icon'>
					<FontAwesomeIcon icon={icon} />
				</div>
				<div className='label'>{label}</div>
			</div>
		</div>
	);
};

export default MenuItem;
