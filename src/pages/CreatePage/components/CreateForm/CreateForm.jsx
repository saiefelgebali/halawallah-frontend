import React, { useState } from "react";
import { uploadPost } from "../../../../api/upload";
import LoadingElipses from "../../../../components/LoadingElipses/LoadingElipses";
import ImageCanvas from "../ImageCanvas/ImageCanvas";
import styles from "./CreateForm.module.scss";

function CreateForm() {
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		// Cancel default refresh screen
		e.preventDefault();

		const canvas = e.target.querySelector("canvas");
		const caption = e.target.querySelector("textarea")?.value;

		// Start posting
		setLoading(true);

		// Convert canvas image to file
		canvas.toBlob(handleUpload);

		async function handleUpload(image) {
			await uploadPost({ image, caption });
			setLoading(false);
		}
	}
	return (
		<div className={styles.create}>
			<form action='' onSubmit={handleSubmit}>
				<fieldset disabled={loading}>
					<ImageCanvas />
					{loading && <LoadingElipses loading={loading} />}
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
						value='Post!'
					/>
				</fieldset>
			</form>
		</div>
	);
}

export default CreateForm;
