import React, { useState } from "react";
import { faLayerGroup, faTh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "../../../../components/Post/Post";
import styles from "./ProfileBody.module.scss";

const Views = {
	Grid: 0,
	Feed: 1,
};

function ProfileBody() {
	const [view, setView] = useState(Views.Grid);

	const ProfileContent = () => {
		if (view === Views.Grid) {
			return (
				<div className={`${styles.content} ${styles.grid}`}>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://i.ytimg.com/vi/-pKIqFjM65I/maxresdefault.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://i.ytimg.com/vi/-pKIqFjM65I/maxresdefault.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.postPreview}>
						<div className={styles.content}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
				</div>
			);
		} else if (view === Views.Feed) {
			return (
				<div className={`${styles.content} ${styles.feed}`}>
					<Post />
					<Post />
					<Post />
				</div>
			);
		}
	};

	return (
		<div className={styles.profileBody}>
			<div className={styles.viewSelector}>
				<div
					className={styles.view}
					onClick={() => setView(Views.Grid)}>
					<FontAwesomeIcon icon={faTh} />
				</div>
				<div
					className={styles.view}
					onClick={() => setView(Views.Feed)}>
					<FontAwesomeIcon icon={faLayerGroup} />
				</div>
			</div>
			<ProfileContent />
		</div>
	);
}

export default ProfileBody;
