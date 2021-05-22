const API = `${process.env.REACT_APP_BACKEND}/api`;
const UPLOAD_POST = `${API}/upload/post/`;
// const UPLOAD_PFP = `${API}/upload/pfp/`;

export async function uploadPost({ image, caption }) {
	const token = "Bearer " + localStorage.getItem("accessToken");

	const data = new FormData();

	data.append("image", image);
	data.append("caption", caption);

	await fetch(UPLOAD_POST, {
		method: "POST",
		headers: {
			Authorization: token,
		},
		body: data,
	});
}
