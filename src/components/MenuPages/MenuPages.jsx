import React from "react";
import {
	faComments,
	faHome,
	faPlus,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "./MenuPages.scss";
import MenuItem from "../Menu/MenuItem";
import "../Menu/Menu.scss";

// Menu Setup
export default function MenuPages() {
	return (
		<div className='menu pages-menu'>
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
}
