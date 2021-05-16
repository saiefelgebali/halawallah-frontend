import React from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Feed from "./components/Feed/Feed";
import styles from "./HomePage.module.scss";

function HomePage() {
	return (
		<MainLayout>
			<div className={styles.main}>
				<Feed />
			</div>
		</MainLayout>
	);
}

export default HomePage;
