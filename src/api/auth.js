const AUTH = `http://${process.env.REACT_APP_SERVER_HOST}/auth`;
const LOGIN = `${AUTH}/login`;
const REGISTER = `${AUTH}/register`;

export async function login({ username, password }) {
	const data = new FormData();

	data.append("username", username);
	data.append("password", password);

	const res = await fetch(LOGIN, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});

	const tokens = await res.json();

	if (tokens.error) {
		throw new Error(tokens.error);
	}

	return tokens;
}

export async function register({ username, password }) {
	const data = new FormData();

	data.append("username", username);
	data.append("password", password);

	const res = await fetch(REGISTER, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	});

	const profile = await res.json();

	if (profile.error) {
		throw new Error(profile.error);
	}

	return profile;
}
