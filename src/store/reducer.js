export default function reducer(state, action) {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				refreshToken: action.refreshToken,
				accessToken: action.accessToken,
				isAuthenticated: true,
			};

		case "LOGOUT":
			return {
				...state,
				refreshToken: null,
				accessToken: null,
				isAuthenticated: false,
			};

		default:
			return state;
	}
}
