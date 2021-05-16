import React from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import Feed from "./components/Feed/Feed";

function HomePage() {
	return (
		<MainLayout>
			<Feed />
		</MainLayout>
	);
}

export default HomePage;
