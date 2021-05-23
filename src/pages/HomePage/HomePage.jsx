import React from "react";
import Feed from "../../components/Feed/Feed";
import styles from "./HomePage.module.scss";
import { FEED } from "../../graphql/query";

function HomePage() {
	return (
		<div className={styles.main}>
			<Feed query={FEED} />
		</div>
	);
}

export default HomePage;
