import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import DropdownItem from "../DropdownItem/DropdownItem";
import styles from "./Post.module.scss";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PostOptions() {
	const [open, setOpen] = useState(false);

	return (
		<div className={styles.options}>
			<div className={styles.icon} onClick={() => setOpen(true)}>
				<FontAwesomeIcon icon={faEllipsisH} />
			</div>

			<Dropdown open={open} setOpen={setOpen} activeMenu={"main"}>
				<DropdownMenu name='main'>
					<DropdownItem label='Delete' left />
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}

export default PostOptions;
