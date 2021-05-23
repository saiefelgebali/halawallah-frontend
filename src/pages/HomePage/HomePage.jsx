import React from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Feed from "../../components/Feed/Feed";
import styles from "./HomePage.module.scss";
import { FEED } from "../../graphql/query";

function HomePage() {
	return (
		<MainLayout>
			<div className={styles.main}>
				<Feed query={FEED} />
			</div>
		</MainLayout>
	);
}

export default HomePage;
