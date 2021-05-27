import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { uploadPost } from "../../../../api/upload";
import { handleInvalid } from "../../../../util/form";
import ErrorAlert from "../../../../components/ErrorAlert/ErrorAlert";
import LoadingElipses from "../../../../components/LoadingElipses/LoadingElipses";
import ImageCanvas from "../ImageCanvas/ImageCanvas";
import styles from "./CreateForm.module.scss";

function CreateForm() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ message: null, type: null });
	const [success, setSuccess] = useState();

	useEffect(() => {
		// Redirect to home on successful post
		if (success) {
			history.push("/home");
			window.location.reload();
		}
	}, [success, history]);

	async function handleSubmit(e) {
		// Cancel default refresh screen
		e.preventDefault();

		const canvas = e.target.querySelector("canvas");
		const caption = e.target.querySelector("textarea")?.value;

		// Start posting
		setLoading(true);
		setError({});

		// Convert canvas image to file
		canvas.toBlob(handleUpload);

		async function handleUpload(image) {
			try {
				await uploadPost({ image, caption });
				setSuccess(true);
			} catch {
				setError({
					message: "Could not upload post. Please try again later.",
					type: "warning",
				});
			}
			setLoading(false);
		}
	}

	const Loading = () => {
		if (!loading) return null;

		return (
			<div className={styles.loading}>
				<LoadingElipses className={styles.loadingElipses} />
			</div>
		);
	};

	return (
		<div className={styles.create}>
			<form
				action=''
				onSubmit={handleSubmit}
				onInvalid={(e) => handleInvalid(e, setError)}>
				<fieldset disabled={false}>
					<ImageCanvas />
					<Loading />
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
