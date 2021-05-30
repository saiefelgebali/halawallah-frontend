import React, { useEffect, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import ProfileHeadTemplate from "./ProfileHeadTemplate";
import styles from "./ProfileHead.module.scss";
import ProfileEditStyles from "./ProfileEdit.module.scss";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../../../graphql/mutation";
import { uploadPfp } from "../../../../api/upload";

function ProfileEdit({ profile, setEditing }) {
	const [updateProfile, { loading }] = useMutation(UPDATE_PROFILE, {
		variables: { username: profile.username },
	});

	const [loadingEdit, setLoadingEdit] = useState(false);
	const [error, setError] = useState({ message: null, type: null });

	// Keep UI loading pegged to mutation loading
	useEffect(() => {
		setLoadingEdit(loading);
	}, [loading]);

	// Choose pfp image
	const EditProfilePicture = () => {
		const [pfp, setPfp] = useState(profile.pfp);

		// Display placeholder pfp
		function handleInputPfp(event) {
			// Get image url
			const file = event.target.files[0];

			if (!file) return;

			const fileUrl = URL.createObjectURL(file);

			setPfp(fileUrl);
		}

		return (
			<div className={styles.pfp}>
				<input
					id={ProfileEditStyles.pfpInput}
					type='file'
					name='pfp'
					accept='.png, .jpg'
					onInput={handleInputPfp}
				/>
				<label htmlFor={ProfileEditStyles.pfpInput}>Edit</label>
				<ProfilePicture src={pfp} />
			</div>
		);
	};

	// Set display name
	const EditDisplay = () => (
		<input
			className={`form-control ${ProfileEditStyles.inputDisplay}`}
			type='text'
			name='display'
			defaultValue={profile.display}
			maxLength={32}
		/>
	);

	// Set bio
	const EditBio = () => (
		<textarea
			className={`form-control ${ProfileEditStyles.inputBio}`}
			name='bio'
			rows='4'
			defaultValue={profile.bio}
			maxLength={255}
		/>
	);

	// Edit Controls - Done
	const EditControls = () => (
		<input
			className={`btn btn-success ${styles.editButton}`}
			type='submit'
			value='Done'
		/>
	);

	async function handleEditSubmit(event) {
		event.preventDefault();

		// Extract form and data
		const form = event.target;
		const formData = new FormData(form);

		setLoadingEdit(true);

		// Upload pfp
		const pfp = formData.get("pfp");
		if (pfp?.name) {
			try {
				await uploadPfp({ pfp });
			} catch {
				setError({
					message: "Could not upload pfp",
					type: "warning",
				});
			}
		}

		// Update profile details
		try {
			await updateProfile({
				variables: {
					display: formData.get("display"),
					bio: formData.get("bio"),
				},
			});
			setEditing(false);
		} catch {
			setError({ message: "Could not update profile", type: "warning" });
		}
	}

	return (
		<ProfileHeadTemplate
			profile={profile}
			pfp={<EditProfilePicture />}
			display={<EditDisplay />}
			bio={<EditBio />}
			controls={<EditControls />}
			handleSubmit={handleEditSubmit}
			loading={loadingEdit}
			error={error}
		/>
	);
}

export default ProfileEdit;
