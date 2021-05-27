import React from "react";
import ErrorAlert from "../../../../components/ErrorAlert/ErrorAlert";
import styles from "./ProfileHead.module.scss";

function ProfileHeadTemplate({
	profile,
	pfp,
	display,
	bio,
	controls,
	handleSubmit,
	loading,
	error,
}) {
	/**
	 * Template for profile head
	 * DRY ProfileDetails and ProfileEdit
	 */

	const Layout = () => (
		<>
			<div className={styles.profile}>
				<div className={styles.left}>
					<div className={styles.pfp}>{pfp}</div>
				</div>
				<div className={styles.details}>
					<div className={styles.display}>{display}</div>
					<div className={styles.username}>
						{profile.user.username}
					</div>
					<div className={styles.bio}>{bio}</div>
				</div>
			</div>
			{error && <ErrorAlert error={error} />}
			<div className={styles.controls}>{controls}</div>
		</>
	);

	// Check if form can be applied
	// Add form if true
	const CheckForm = ({ children }) => {
		if (handleSubmit)
			return (
				<form onSubmit={handleSubmit}>
					<fieldset disabled={loading}>{children}</fieldset>
				</form>
			);
		return children;
	};

	return (
		<div className={styles.head}>
			<CheckForm>
				<Layout />
			</CheckForm>
		</div>
	);
}

export default ProfileHeadTemplate;
