import React from "react";
import CreateForm from "./components/CreateForm/CreateForm";
import styles from "./CreatePage.module.scss";

function CreatePage() {
	return (
		<div className={styles.create}>
			<div className={styles.title}>
				<h1>Create</h1>
			</div>

			<CreateForm />
		</div>
	);
}

export default CreatePage;
