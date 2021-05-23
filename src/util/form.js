export function handleInvalid(event, setError) {
	// Block default behaviour
	event.preventDefault();

	event.target.classList.add("invalid");

	// Set warning error
	const fieldName = event.target.name;

	setError({
		message: `Check the ${fieldName} field`,
		type: "warning",
	});
}
