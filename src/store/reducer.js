export default function reducer(state, action) {
	switch (action.type) {
		case "LIGHT_MODE":
			return {
				theme: "light",
			};

		case "DARK_MODE":
			return {
				theme: "dark",
			};

		default:
			return state;
	}
}
