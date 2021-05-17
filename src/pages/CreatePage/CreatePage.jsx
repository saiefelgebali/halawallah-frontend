import React from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ImageCanvas from "./components/ImageCanvas/ImageCanvas";
import styles from "./CreatePage.module.scss";

function CreatePage() {
	return (
		<MainLayout>
			<div className={styles.create}>
				<div className={styles.title}>
					<h1>Create</h1>
				</div>

				<ImageCanvas />
			</div>
		</MainLayout>
	);
}

export default CreatePage;
