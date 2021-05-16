import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import { faEllipsisH, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Post.module.scss";

function PostOptions() {
	const [open, setOpen] = useState(false);

	const Menu = () => (
		<div name='main'>
			<div leftIcon={faTrash} label='Delete' />
		</div>
	);

	return (
		<div className={styles.options}>
			<Dropdown open={open} setOpen={setOpen}>
				{Menu()}
			</Dropdown>
			<div className={styles.icon} onClick={() => setOpen(true)}>
				<FontAwesomeIcon icon={faEllipsisH} />
			</div>
		</div>
	);
}

export default PostOptions;
