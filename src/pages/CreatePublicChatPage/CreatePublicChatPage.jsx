import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./CreatePublicChatPage.module.scss";

function CreatePublicChatPage() {
	const Header = () => (
		<div className={styles.header}>
			<h1 className={styles.title}>Start a chat</h1>
			<Link to='/chat' className={styles.link}>
				<FontAwesomeIcon icon={faTimes} className={styles.backButton} />
			</Link>
		</div>
	);

	return (
		<div className={styles.createPublicPage}>
			<Header />

			<div className={styles.search}>
				<SearchBar />
			</div>
		</div>
	);
}

export default CreatePublicChatPage;
