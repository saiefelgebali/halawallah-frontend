import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
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
		</div>
	);
}

export default PostOptions;
