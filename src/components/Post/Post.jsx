import { Link } from "react-router-dom";
import PostComments from "./PostComments";
import Username from "../_shared/Username";
import styles from "./Post.module.scss";
import PostOptions from "./PostOptions";

// Complete Post Component
function Post({ post }) {
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
					username={post.profile.user.username}
					src={post.profile.pfp}
					onDragStart={(e) => e.preventDefault()}
				/>
				<Username
					username={post.profile.user.username}
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
					src={post.image}
					alt={`${post.profile.user.username}'s post`}
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
						username={post.profile.user.username}
						className={styles.username}
					/>
					<span className={styles.caption}>{post.caption}</span>
					<PostComments post={post} />
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
