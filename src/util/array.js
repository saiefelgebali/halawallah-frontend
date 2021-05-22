export const removeDuplicates = (duplicates, key) => {
	/**
	 * Returns an array of unique objects
	 */

	// check if the value is already present
	const flag = {};

	// objects that have not been flagged yet
	const unique = [];

	// Loop once through array,
	// check for key,
	// push if not flagged before
	duplicates.forEach((elem) => {
		if (!flag[elem[key]]) {
			flag[elem[key]] = true;
			unique.push(elem);
		}
	});
	return unique;
};
