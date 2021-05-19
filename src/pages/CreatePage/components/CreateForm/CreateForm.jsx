import React from "react";
import ImageCanvas from "../ImageCanvas/ImageCanvas";
import styles from "./CreateForm.module.scss";

function CreateForm() {
	function handleSubmit(e) {
		// Cancel default refresh screen
		e.preventDefault();

		const canvas = e.target.querySelector("canvas");
		const caption = e.target.querySelector("textarea")?.value;

		// Convert canvas image to file
		const image = canvas.toDataURL();

		// Post data to be uploaded
		const post = {
			image,
			caption,
		};

		console.log(post);
	}
	return (
		<div className={styles.create}>
			<form action='' onSubmit={handleSubmit}>
				<ImageCanvas />
				<div className={styles.caption}>
					<textarea
						className={`form-control ${styles.captionInput}`}
						rows={2}
						placeholder='Say something...'
					/>
				</div>
				<input
					type='submit'
					className={`btn ${styles.postButton}`}
					value='Post!'></input>
			</form>
		</div>
	);
}

export default CreateForm;
