export const login = (dispatch, { refreshToken, accessToken }) => {
	// Login user by saving relevant refreshToken
	localStorage.setItem("accessToken", accessToken);
	localStorage.setItem("refreshToken", refreshToken);
	return dispatch({ type: "LOGIN", refreshToken, accessToken });
};

export const logout = (dispatch) => {
	localStorage.clear("accessToken");
	localStorage.clear("refreshToken");
	return dispatch({ type: "LOGOUT" });
};
