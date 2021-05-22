import React, { useState } from "react";
import { uploadPost } from "../../../../api/upload";
import ErrorAlert from "../../../../components/ErrorAlert/ErrorAlert";
import LoadingElipses from "../../../../components/LoadingElipses/LoadingElipses";
import ImageCanvas from "../ImageCanvas/ImageCanvas";
import styles from "./CreateForm.module.scss";

function CreateForm() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ message: null, type: null });

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
			try {
				await uploadPost({ image, caption });
			} catch {
				setError({
					message: "Could not upload post. Please try again later.",
					type: "warning",
				});
			}
			setLoading(false);
		}
	}
	return (
		<div className={styles.create}>
			<form action='' onSubmit={handleSubmit}>
				<fieldset disabled={false}>
					<ImageCanvas />
					{loading && <LoadingElipses loading={loading} />}
					{error && <ErrorAlert error={error} />}
					<textarea
						className={`form-control ${styles.captionInput}`}
						rows={2}
						placeholder='Say something...'
					/>
					<input
						type='submit'
						className={`btn btn-primary ${styles.postButton}`}
						value='Post!'
					/>
				</fieldset>
			</form>
		</div>
	);
}

export default CreateForm;
