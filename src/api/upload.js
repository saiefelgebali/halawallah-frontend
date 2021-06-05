const API = `http://${process.env.REACT_APP_SERVER_HOST}/api`;
const UPLOAD_POST = `${API}/upload/post/`;
const UPLOAD_PFP = `${API}/upload/pfp/`;

export async function uploadPost({ image, caption }) {
	const token = "Bearer " + localStorage.getItem("accessToken");

	const data = new FormData();

	data.append("image", image);
	data.append("caption", caption);

	return await fetch(UPLOAD_POST, {
		method: "POST",
		headers: {
			Authorization: token,
		},
		body: data,
	});
}

export async function uploadPfp({ pfp }) {
	const token = "Bearer " + localStorage.getItem("accessToken");

	const data = new FormData();

	data.append("pfp", pfp);

	return await fetch(UPLOAD_PFP, {
		method: "POST",
		headers: {
			Authorization: token,
		},
		body: data,
	});
}
