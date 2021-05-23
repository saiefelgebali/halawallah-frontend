import React from "react";
import { useQuery } from "@apollo/client";
import { FEED } from "../../graphql/query";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Feed from "../../components/Feed/Feed";
import styles from "./HomePage.module.scss";

function HomePage() {
	const { data, loading, fetchMore } = useQuery(FEED, {
		variables: {
			offset: 0,
			limit: 2,
		},
		fetchPolicy: "cache-first",
		nextFetchPolicy: "network-only",
		notifyOnNetworkStatusChange: true,
	});
	return (
		<MainLayout>
			<div className={styles.main}>
				<Feed
					feed={data?.feed?.data}
					hasMore={data?.feed?.hasMore}
					fetchMore={fetchMore}
					loading={loading}
				/>
			</div>
		</MainLayout>
	);
}

export default HomePage;
