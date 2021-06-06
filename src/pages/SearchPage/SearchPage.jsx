import React from "react";
import SearchBar from "../../components/SearchBar/SearchBar";

import styles from "./SearchPage.module.scss";

function SearchPage() {
	return (
		<div className={styles.searchPage}>
			<div className={styles.header}>
				<h1 className={styles.title}>Search</h1>
			</div>
			<SearchBar />
		</div>
	);
}

export default SearchPage;
