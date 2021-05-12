import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import Menu from "../Menu/Menu";
import MenuItem from "../Menu/MenuItem";

function MenuProfile() {
	const [open, setOpen] = useState();

	return (
		<Menu>
			<Dropdown open={open} setOpen={setOpen} />

			<MenuItem
				icon={faUser}
				label='Profile'
				onClick={() => setOpen(true)}
			/>
		</Menu>
	);
}

export default MenuProfile;
