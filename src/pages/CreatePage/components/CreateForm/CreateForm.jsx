import React from "react";
import ImageCanvas from "../ImageCanvas/ImageCanvas";
import styles from "./CreateForm.module.scss";

function CreateForm() {
	return (
		<div className={styles.create}>
			<ImageCanvas />
		</div>
	);
}

export default CreateForm;
