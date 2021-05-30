import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PROFILE } from "../../graphql/query";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import LoadingElipses from "../../components/LoadingElipses/LoadingElipses";
import styles from "./SearchPage.module.scss";
import { Link } from "react-router-dom";

function SearchPage() {
	const [loadSearchResults, { data, loading }] = useLazyQuery(SEARCH_PROFILE);

	const [results, setResults] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	const inputQuery = useRef();

	const searchLimit = 10;

	// Update UI results on data change
	useEffect(() => {
		if (!data) return;

		setResults(data.searchProfile.data);
		setHasMore(data.searchProfile.hasMore);
	}, [data]);

	// Make queries on input change
	function handleQueryChange() {
		// Clear results on empty query
		if (!inputQuery?.current?.value) {
			setResults([]);
			return;
		}

		loadSearchResults({
			variables: {
				query: inputQuery.current.value,
				offset: 0,
				limit: searchLimit,
			},
		});
	}

	// Map out search results
	const SearchResult = ({ result }) => (
		<Link className={styles.result} to={`profile/${result.username}`}>
			<ProfilePicture username={result.username} src={result.pfp} block />
			<div className={styles.username}>{result.username}</div>
		</Link>
	);

	const SearchResults = () => {
		if (!results) return null;

		// Button to load more results
		const ShowMore = () => {
			if (!results.length) return null;

			if (hasMore) {
				return (
					<div
						className={styles.showMore}
						onClick={() =>
							loadSearchResults({
								variables: {
									query: inputQuery.current.value,
									offset: 0,
									limit: results.length + searchLimit,
								},
							})
						}>
						<div>Show More</div>
					</div>
				);
			} else {
				return null;
			}
		};

		return (
			<div className={styles.searchResults}>
				{results.map((result) => (
					<SearchResult key={result.username} result={result} />
				))}
				<ShowMore />
			</div>
		);
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
			<input
				ref={inputQuery}
				type='text'
				placeholder='Search...'
				className={`form-control ${styles.searchInput}`}
				onChange={handleQueryChange}
			/>
			<SearchResults />
			<Loading />
		</div>
	);
}

export default SearchPage;
