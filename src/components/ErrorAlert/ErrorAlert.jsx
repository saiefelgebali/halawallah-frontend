import React from "react";

function ErrorAlert({ error }) {
	// Null if no error
	if (!error.message) {
		return null;
	}

	// Set class based on error type
	const className = `alert alert-${error.type}`;

	return <div className={className}>{error.message}</div>;
}

export default ErrorAlert;
