import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Username from "./Username";

// Maps out comments
// Handle pagination
const Comments = () => {
	return (
		<div className='list'>
			<Comment />
			<Comment />
			<Comment />
			<div className='show-more'>Show more</div>
		</div>
	);
};

const Comment = () => {
	return (
		<div className='comment'>
			<Username username='commenter' />
			<span>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam,
				ad iusto quos porro ducimus veritatis quisquam perferendis
				corrupti quidem exercitationem architecto. Dicta nostrum
				exercitationem eveniet quaerat quidem. Officia, asperiores id!
			</span>
		</div>
	);
};

const ComposeComment = () => {
	return (
		<div className='compose'>
			<textarea
				name='text'
				id=''
				cols='30'
				rows='2'
				placeholder='Say Something...'
				className='form-control'></textarea>
			<button className='btn btn-primary'>Comment</button>
		</div>
	);
};

function PostComments() {
	// Comment section is active state
	const [collapsed, setCollapsed] = useState(true);
	const toggleCollapsed = () => setCollapsed((prev) => !prev);

	return (
		<div className={`comments ${collapsed ? "collapsed" : ""}`}>
			<div className='header' onClick={toggleCollapsed}>
				<div>Comments (0)</div>
				<div className='arrow'>
					<FontAwesomeIcon icon={faChevronDown} />
				</div>
			</div>
			<div className='section'>
				<ComposeComment />
				<Comments />
			</div>
		</div>
	);
}

export default PostComments;
