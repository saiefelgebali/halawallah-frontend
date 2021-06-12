import React from "react";
import { Link } from "react-router-dom";
import styles from "./AboutPage.module.scss";

function AboutPage() {
	return (
		<div className={styles.aboutPage}>
			<h1 className={styles.title}>About Hala</h1>
			<div className={styles.status}>
				Hala is currently in its early Alpha phase
			</div>
			<div className={styles.block}>
				<p>
					Hala, <i>meaning "hi" in Arabic</i>, started off as a school
					project.
				</p>
				<p>
					Our mission is to create a safe social media platform, where
					clean content is encouraged.
				</p>

				<p>
					If you have any suggestions, please message{" "}
					<Link to='/profile/saief' className={styles.usernameLink}>
						@saief
					</Link>
				</p>
			</div>

			<div className={styles.block}>
				<h2>For mobile users</h2>
				<p>
					If you are on a mobile device, you can "Add to home screen"
					to download our PWA (Progressive Web App), where this
					website will act just like a mobile app!
				</p>
			</div>

			<div className={styles.block}>
				<h2>Upcoming Features</h2>
				<p>Some of the features currently being worked on include,</p>
				<ul>
					<li>Notifications (Following, comments, etc.)</li>
					<li>Offline mode for PWA</li>
					<li>Integration with system dark mode</li>
				</ul>
			</div>
		</div>
	);
}

export default AboutPage;
