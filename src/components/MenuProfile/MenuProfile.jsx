import { useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "../Menu/MenuItem";
import "../Menu/Menu.scss";
import "./MenuProfile.scss";

function MenuProfile() {
	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen((prev) => !prev);

	console.log(open);

	if (!open)
		return (
			<div className='menu profile-menu'>
				<MenuItem icon={faUser} label='Profile' onClick={toggleOpen} />
			</div>
		);

	return (
		<div className='menu profile-menu'>
			<MenuItem icon={faUser} label='Profile' onClick={toggleOpen} />
		</div>
	);
}

export default MenuProfile;
