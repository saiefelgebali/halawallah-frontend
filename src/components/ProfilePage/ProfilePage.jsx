import React from "react";
import { useParams } from "react-router";
import styles from "./ProfilePage.module.scss";

function ProfilePage() {
	// Username used in url param
	const { username } = useParams();

	return (
		<div className={styles.profile}>
			<div className={styles.profileHead}>
				<div className={styles.details}>
					<div className={styles.left}>
						<div className={styles.pfp}>
							<img
								src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
								alt=''
							/>
						</div>
					</div>
					<div className={styles.right}>
						<div className={styles.username}>{username}</div>
						<div className={styles.bio}>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Cum pariatur quidem, omnis repudiandae ullam
							nam similique at esse sit porro tempora hic, illo,
							eius voluptates aperiam est. Eum, tempore atque?
						</div>
					</div>
				</div>
				<div className={styles.control}>
					<div className={styles.editButton}>Edit Button</div>
					<div className={styles.editButton}>Edit Button</div>
				</div>
			</div>
			<div className={styles.profileContent}>Post 1</div>
		</div>
	);
}

export default ProfilePage;
