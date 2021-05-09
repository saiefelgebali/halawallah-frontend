import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";

// Top section of post
// Contains profile & post details
const PostHead = () => (
	<div className='head'>
		<div className='section'>
			<ProfilePicture
				username='saiefelgebali'
				src='https://pbs.twimg.com/profile_images/1192781853712887808/lQI-thTv.jpg'
			/>
			<Username username='saiefelgebali' />
		</div>
		<div className='section'>
			<div className='timestamp'>11:59 AM</div>
			<div className='settings'></div>
		</div>
	</div>
);

// Middle section of post
// Contains the actual content of the post
const PostBody = () => (
	<div className='body'>
		<div className='content'>
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
const PostFoot = () => (
	<div className='foot'>
		<div className='details'>
			<Username username='saiefelgebali' />
			<span className='caption'>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit.
				Eligendi, tempore at. Aspernatur magnam aut optio nesciunt
				cumque non minus ullam voluptatem ducimus consectetur maiores,
				maxime illo, praesentium exercitationem iusto ad.
			</span>
		</div>
		<div className='comments'>
			<div className='header'>Comments (0)</div>
		</div>
	</div>
);

// Utility Components
const Username = ({ username }) => (
	<Link to={`/profile/${username}`} className='username'>
		{username}
	</Link>
);

const ProfilePicture = ({ username, src }) => (
	<Link to={`/profile/${username}`} className='pfp'>
		<img src={src} alt='' />
	</Link>
);

// Complete Post Component
function Post() {
	return (
		<div className='post'>
			<PostHead />
			<PostBody />
			<PostFoot />
		</div>
	);
}

export default Post;
