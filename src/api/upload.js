const API = `http://${process.env.REACT_APP_SERVER_HOST}/api`;
const UPLOAD_POST = `${API}/upload/post/`;
const UPLOAD_PFP = `${API}/upload/pfp/`;
const UPLOAD_PUBLIC_CHAT_IMAGE = `${API}/upload/public_chat/`;

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

export async function uploadPublicChatImage({ image, room_id }) {
	const token = "Bearer " + localStorage.getItem("accessToken");

	const data = new FormData();

	data.append("image", image);
	data.append("room_id", room_id);

	return await fetch(UPLOAD_PUBLIC_CHAT_IMAGE, {
		method: "POST",
		headers: {
			Authorization: token,
		},
		body: data,
	});
}
