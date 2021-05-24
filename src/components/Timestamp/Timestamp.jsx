import React from "react";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function Timestamp({ timestamp }) {
	/**
	 * Take an ISO string and return a timestamp
	 * Timestamp format is dependant on how recent it was
	 */

	// Today's date to be used for comparing
	const current = new Date();

	// Utility dates
	const lastMinute = new Date(
		current.getFullYear(),
		current.getMonth(),
		current.getDate(),
		current.getHours(),
		current.getMinutes() - 1,
		current.getSeconds()
	);
	const lastHour = new Date(
		current.getFullYear(),
		current.getMonth(),
		current.getDate(),
		current.getHours() - 1,
		current.getMinutes(),
		current.getSeconds()
	);
	const lastDay = new Date(
		current.getFullYear(),
		current.getMonth(),
		current.getDate() - 1,
		current.getHours(),
		current.getMinutes(),
		current.getSeconds()
	);
	const lastWeek = new Date(
		current.getFullYear(),
		current.getMonth(),
		current.getDate() - 7,
		current.getHours(),
		current.getMinutes(),
		current.getSeconds()
	);

	// Date of timestamp
	const date = new Date(timestamp);

	function getTimeDifference(d1, d2, type) {
		/**
		 * Get the formatted difference of two dates
		 */
		const diff = Math.abs(d1 - d2);

		switch (type) {
			case "second":
				return Math.floor(diff / 1000);
			case "minute":
				return Math.floor(diff / 1000 / 60);
			case "hour":
				return Math.floor(diff / 1000 / 60 / 60);
			case "day":
				return Math.floor(diff / 1000 / 60 / 60 / 24);
			default:
				return diff;
		}
	}

	function formatTimestamp() {
		// Within 60 seconds
		if (date > lastMinute) {
			// Return minutes ago
			return `${getTimeDifference(current, date, "second")} seconds ago`;
		}

		// Within 60 minutes
		if (date > lastHour) {
			// Return minutes ago
			return `${getTimeDifference(current, date, "minute")} minutes ago`;
		}

		// Within 24hrs
		if (date > lastDay) {
			// Return hours ago
			return `${getTimeDifference(current, date, "hour")} hours ago`;
		}

		// If post was made within 7 days
		else if (date > lastWeek) {
			// Return days ago
			const daysDiff = getTimeDifference(current, date, "day");

			if (daysDiff === 1) {
				return "Yesterday";
			}

			return `${daysDiff} days ago`;
		}

		// If post was made within this current year
		else if (date.getFullYear() === current.getFullYear()) {
			// Return day and month
			return `${months[date.getMonth()]} ${date.getDate()}`;
		}

		// If post was made in a previous year
		else if (date.getFullYear() !== current.getFullYear()) {
			// Return month day, year
			return `${
				months[date.getMonth()]
			} ${date.getDate()}, ${date.getFullYear()}`;
		}
	}

	return <div>{formatTimestamp()}</div>;
}

export default Timestamp;
