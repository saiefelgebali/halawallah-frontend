export default function reducer(state, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				refreshToken: action.refreshToken,
				isAuthenticated: true,
			};

		case "LOGOUT":
			return {
				...state,
				refreshToken: null,
				isAuthenticated: false,
			};

		default:
			return state;
	}
}
