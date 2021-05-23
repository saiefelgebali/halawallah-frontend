import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PROFILE } from "../../graphql/query";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import LoadingElipses from "../../components/LoadingElipses/LoadingElipses";
import styles from "./SearchPage.module.scss";
import { Link } from "react-router-dom";

function SearchPage() {
	const [loadSearchResults, { data, loading }] = useLazyQuery(SEARCH_PROFILE);
	const [results, setResults] = useState([]);

	useEffect(() => {
		if (!data) return;

		setResults(data.searchProfile.data);
	}, [data]);

	// Make queries on input change
	function handleQueryChange(event) {
		const query = event.target.value;

		// Clear results on empty query
		if (!query) {
			setResults([]);
			return;
		}
		loadSearchResults({ variables: { query, offset: 0, limit: 10 } });
	}

	// Map out search results
	const SearchResult = ({ result }) => (
		<Link className={styles.result} to={`profile/${result.user.username}`}>
			<ProfilePicture
				username={result.user.username}
				src={result.pfp}
				block
			/>
			<div className={styles.username}>{result.user.username}</div>
		</Link>
	);

	const SearchResults = () => {
		if (!results) return null;

		return results.map((result) => (
			<SearchResult key={result.profile_id} result={result} />
		));
	};

	const Loading = () => {
		if (!loading) return null;
		return (
			<div className={styles.loading}>
				<LoadingElipses className={styles.loadingElipses} />
			</div>
		);
	};

	return (
		<div className={styles.search}>
			<form action='#'>
				<input
					type='text'
					placeholder='Search...'
					className={`form-control ${styles.searchInput}`}
					onChange={handleQueryChange}
				/>
			</form>
			<div className={styles.searchResults}>
				<SearchResults />
			</div>
			<Loading />
		</div>
	);
}

export default SearchPage;
