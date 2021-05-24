import PostComments from "./PostComments";
import Username from "../_shared/Username";
import styles from "./Post.module.scss";
import PostOptions from "./PostOptions";
import ProfilePicture from "../ProfilePicture/ProfilePicture";
import Timestamp from "../Timestamp/Timestamp";

// Complete Post Component
function Post({ post, observerRef }) {
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
		<div className={styles.head} ref={observerRef}>
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
				<div className={styles.timestamp}>
					<Timestamp timestamp={post.created_at} />
				</div>
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
						username={post.profile.user.username}
						className={styles.username}
					/>
					<span className={styles.caption}>{post.caption}</span>
					<PostComments post={post} />
				</div>
			</div>
		);
	};

	return (
		<div className={styles.post}>
			<PostHead />
			<PostBody />
			<PostFoot />
		</div>
	);
}

export default Post;
