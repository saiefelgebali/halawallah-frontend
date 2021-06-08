import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { uploadPost } from "../../../../api/upload";
import { handleInvalid } from "../../../../util/form";
import ErrorAlert from "../../../../components/ErrorAlert/ErrorAlert";
import LoadingElipses from "../../../../components/LoadingElipses/LoadingElipses";
import ImageCanvas from "../ImageCanvas/ImageCanvas";
import styles from "./CreateForm.module.scss";
import { FEED } from "../../../../graphql/query";
import * as nsfwjs from "nsfwjs";
import { useQuery } from "@apollo/client";

function CreateForm() {
	const history = useHistory();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ message: null, type: null });

	// To refetch feed on upload
	const { refetch } = useQuery(FEED, {
		variables: {
			offset: 0,
			limit: 4,
		},
		fetchPolicy: "cache-and-network",
	});

	async function handleSubmit(e) {
		// Cancel default refresh screen
		e.preventDefault();

		const canvas = e.target.querySelector("canvas");
		const caption = e.target.querySelector("textarea")?.value;

		// Start posting
		setLoading(true);
		setError({});

		// Pass image through nsfw filter
		const isCleanImage = await filterNSFW(canvas);

		if (isCleanImage) {
			// Image is deemed clean
			// Convert canvas image to file
			// Upload image
			canvas.toBlob(handleUpload);
		} else {
			// Could not pass through filter
			setError({
				message: "Sorry, this image violates our community guidelines",
				type: "danger",
			});
		}
		setLoading(false);

		async function filterNSFW(canvas) {
			// Load indecent content filter model
			const model = await nsfwjs.load("/quant_nsfw_mobilenet/");

			// Classify image
			const predictions = await model.classify(canvas);

			// Detect an indecent image - Set error
			switch (predictions[0].className) {
				case "Hentai":
				case "Porn":
				case "Sexy":
					console.log(predictions);
					return false;

				default:
					return true;
			}
		}

		async function handleUpload(image) {
			try {
				// Make upload
				await uploadPost({ image, caption });
				// Refetch feed
				await refetch();
				// Redirect to /home
				history.push("/home");
			} catch (e) {
				console.log(e);
				setError({
					message: "Could not upload post. Please try again later.",
					type: "warning",
				});
			}
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
