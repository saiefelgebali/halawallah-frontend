import React from "react";
import { Link } from "react-router-dom";

// Utility Components
const Username = ({ username }) => (
	<Link to={`/profile/${username}`} className='username'>
		{username}
	</Link>
);

export default Username;
