import React from "react";
import Post from "../Post/Post";
import "./Feed.scss";

function Feed() {
	return (
		<div className='feed'>
			<Post />
			<Post />
		</div>
	);
}

export default Feed;
