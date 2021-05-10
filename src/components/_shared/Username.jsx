import React from "react";
import { Link } from "react-router-dom";

// Utility Components
const Username = ({ username, className = "" }) => (
	<Link to={`/profile/${username}`} className={`username ${className}`}>
		{username}
	</Link>
);

export default Username;
