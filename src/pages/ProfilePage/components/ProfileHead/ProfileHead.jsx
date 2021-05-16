import React from "react";
import styles from "./ProfileHead.module.scss";

function ProfileHead() {
	return (
		<div className={styles.head}>
			<div className={styles.profile}>
				<div className={styles.pfp}>
					<img
						src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
						alt=''
					/>
				</div>
				<div className={styles.details}>
					<div className={styles.display}>Saief Ahmed</div>
					<div className={styles.username}>saiefelgebali</div>
					<div className={styles.bio}>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Illo harum cumque blanditiis nihil mollitia,
						dolores iure accusantium aspernatur nemo aliquid
						assumenda quo atque repudiandae consequatur voluptates
						eos aut hic ipsam?
					</div>
				</div>
			</div>
			<div className={styles.controls}>
				<button className={styles.editButton}>Edit</button>
				<button className={styles.editButton}>Edit</button>
			</div>
		</div>
	);
}

export default ProfileHead;
