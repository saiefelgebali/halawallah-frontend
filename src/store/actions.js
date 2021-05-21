export const login = (dispatch, { refreshToken, accessToken }) => {
	// Login user by saving relevant refreshToken
	return dispatch({ type: "LOGIN", refreshToken, accessToken });
};

export const logout = (dispatch) => {
	return dispatch({ type: "LOGOUT" });
};
