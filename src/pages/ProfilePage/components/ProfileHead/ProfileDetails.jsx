import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileHeadTemplate from "./ProfileHeadTemplate";
import { useMutation } from "@apollo/client";
import { FOLLOW } from "../../../../graphql/mutation";
import { PROFILE_DETAILS } from "../../../../graphql/query";
import styles from "./ProfileDetails.module.scss";

// Fetch and show profile information
export function ProfileDetails({ profile, me, setEditing }) {
	const [toggleFollow] = useMutation(FOLLOW, {
		variables: { following_id: profile.profile_id },

		// Optimistic Response - Zero latency response
		optimisticResponse: {
			follow: {
				...profile,
				isFollowing: !profile.isFollowing,
				__typename: "Profile",
			},
		},

		// Update twice, once on optimistic UI, second on actual mutation result
		update: (cache, { data: { follow } }) => {
			// Update the cached profile details with mutation result
			cache.writeQuery({
				query: PROFILE_DETAILS,
				variables: { username: profile.user.username },
				follow,
			});
		},
	});

	const ProfilePicture = () => {
		// Show generic pfp
		if (!profile.pfp) {
			return (
				<FontAwesomeIcon icon={faUser} className={styles.placeholder} />
			);
		}

		// Show profile pfp
		return <img src={profile.pfp} alt='' />;
	};

	const Controls = () => {
		const FollowButton = () => (
			<div
				className={`btn btn-primary ${styles.followButton}`}
				onClick={() => toggleFollow()}
			/>
		);

		const FollowingButton = () => (
			<div
				className={`btn btn-secondary ${styles.followingButton}`}
				onClick={() => toggleFollow()}
			/>
		);

		// If my profile
		if (me.profile_id === profile.profile_id) {
			return (
				<button
					className='btn btn-primary'
					onClick={() => setEditing(true)}>
					Edit
				</button>
			);
		}

		// Other profiles
		if (profile.isFollowing) return <FollowingButton />;

		return <FollowButton />;
	};

	return (
		<ProfileHeadTemplate
			profile={profile}
			pfp={<ProfilePicture />}
			display={profile.display}
			bio={profile.bio}
			controls={<Controls />}
		/>
	);
}

export default ProfileDetails;
