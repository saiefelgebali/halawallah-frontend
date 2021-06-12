import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_PROFILE } from "../../graphql/query";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import LoadingElipses from "../LoadingElipses/LoadingElipses";
import styles from "./SearchBar.module.scss";

function SearchBar({ filter, CustomSearchResult }) {
	const [loadSearchResults, { data, loading }] = useLazyQuery(SEARCH_PROFILE);
	const searchLimit = 10;

	// Data kept in state variables for better UX
	const [results, setResults] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	const inputQuery = useRef();

	// Make initial query with empty string
	useEffect(() => {
		// Make query
		loadSearchResults({
			variables: {
				query: "",
				offset: 0,
				limit: searchLimit,
			},
		});
	}, [loadSearchResults]);

	// Keep state synced with data
	useEffect(() => {
		if (!data) return;

		if (filter) {
			setResults(data.searchProfile.data.filter(filter));
		} else {
			setResults(data.searchProfile.data);
		}
		setHasMore(data.searchProfile.hasMore);
	}, [data, filter]);

	// Query on input change
	function handleQueryChange(event) {
		// Make query
		loadSearchResults({
			variables: {
				query: event.target.value,
				offset: 0,
				limit: searchLimit,
			},
		});
	}

	// Map out results in a list
	const SearchResults = () => {
		if (!results.length && data) {
			return (
				<div className={styles.searchResult}>
					<div className={styles.error}>
						No results for "{inputQuery.current.value}"
					</div>
				</div>
			);
		}

		// If a custom search result component is provided, use it instead of default
		if (CustomSearchResult) {
			return results.map((result) => (
				<CustomSearchResult key={result.username} result={result} />
			));
		}

		return results.map((result) => (
			<SearchResult key={result.username} result={result} />
		));
	};

	// Single result instance
	const SearchResult = ({ result }) => (
		<Link className={styles.result} to={`/profile/${result.username}`}>
			<ProfilePicture username={result.username} src={result.pfp} block />
			<div className={styles.username}>{result.username}</div>
		</Link>
	);

	// Button to show more results
	const ShowMore = () => {
		if (!hasMore) return null;
		if (loading) return null;

		const handleShowMore = () => {
			setHasMore(false);
			loadSearchResults({
				variables: {
					query: inputQuery.current.value,
					offset: 0,
					limit: results.length + searchLimit,
				},
			});
		};

		return (
			<div className={styles.showMore} onClick={handleShowMore}>
				<div className={styles.text}>Show More</div>
			</div>
		);
	};

	// Shows loading when fetching data
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
				placeholder='Search profiles'
				className={`form-control ${styles.searchInput}`}
				onChange={handleQueryChange}
			/>
			<div className={styles.searchResults}>
				<SearchResults />
				<ShowMore />
				<Loading />
			</div>
		</div>
	);
}

export default SearchBar;
