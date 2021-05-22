export const login = (dispatch, { refreshToken, accessToken }) => {
	// Login user by saving relevant refreshToken
	localStorage.setItem("accessToken", accessToken);
	localStorage.setItem("refreshToken", refreshToken);
	return dispatch({ type: "LOGIN", refreshToken, accessToken });
};

export const logout = (dispatch) => {
	localStorage.setItem("accessToken", null);
	localStorage.setItem("refreshToken", null);
	return dispatch({ type: "LOGOUT" });
};
