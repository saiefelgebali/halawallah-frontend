import { Link } from "react-router-dom";
import PostComments from "./PostComments";
import Username from "../_shared/Username";
import styles from "./Post.module.scss";
import PostOptions from "./PostOptions";

// Complete Post Component
function Post() {
	/**
	 * @summary Individual Post
	 *
	 * @description
	 * - Post made up of 3 main components. Head, Body, Foot.
	 *
	 * @returns {JSX.Element}
	 */

	// Top section of post
	// Contains profile & post details
	const PostHead = () => (
		<div className={styles.head}>
			<div className={styles.section}>
				<ProfilePicture
					username='saiefelgebali'
					src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
					onDragStart={(e) => e.preventDefault()}
				/>
				<Username
					username='saiefelgebali'
					className={styles.username}
				/>
				<div className={styles.timestamp}>11:59 AM</div>
			</div>
			<div className={styles.section}>
				<PostOptions />
			</div>
		</div>
	);

	// Middle section of post
	// Contains the actual content of the post
	const PostBody = () => (
		<div className={styles.body}>
			<div className={styles.content}>
				<img
					src='https://i.ytimg.com/vi/-pKIqFjM65I/maxresdefault.jpg'
					alt=''
					onDragStart={(e) => e.preventDefault()}
				/>
			</div>
		</div>
	);

	// Bottom section of post
	// Contains caption, profile, actions and comments
	const PostFoot = () => {
		return (
			<div className={styles.foot}>
				<div className={styles.details}>
					<Username
						username='saiefelgebali'
						className={styles.username}
					/>
					<span className={styles.caption}>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Eligendi, tempore at. Aspernatur magnam aut optio
						nesciunt cumque non minus ullam voluptatem ducimus
						consectetur maiores, maxime illo, praesentium
						exercitationem iusto ad.
					</span>
					<PostComments />
				</div>
			</div>
		);
	};

	const ProfilePicture = ({ username, src }) => (
		<Link to={`/profile/${username}`} className={styles.pfp}>
			<img src={src} alt='' />
		</Link>
	);

	return (
		<div className={styles.post}>
			<PostHead />
			<PostBody />
			<PostFoot />
		</div>
	);
}

export default Post;
