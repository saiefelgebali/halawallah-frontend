import axios from "axios";

export async function uploadPost({ image, caption }) {
	const token = "Bearer " + localStorage.getItem("accessToken");
	console.log(token);

	const data = new FormData();

	data.append("image", image);
	data.append("caption", caption);

	await fetch("http://127.0.0.1:5000/api/upload/post/", {
		method: "POST",
		headers: {
			Authorization: token,
		},
		body: data,
	});
}
