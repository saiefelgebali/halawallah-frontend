import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import ProfileHeadTemplate from "./ProfileHeadTemplate";
import { useMutation } from "@apollo/client";
import { FOLLOW } from "../../../../graphql/mutation";
import { PROFILE_DETAILS } from "../../../../graphql/query";
import styles from "./ProfileDetails.module.scss";
import { Link } from "react-router-dom";

// Fetch and show profile information
export function ProfileDetails({ profile, me, setEditing }) {
	const [toggleFollow] = useMutation(FOLLOW, {
		variables: { following_username: profile.username },

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
				variables: { username: profile.username },
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
		const FollowButton = () =>
			profile.isFollowing ? (
				<div
					className={`btn btn-secondary ${styles.followingButton}`}
					onClick={() => toggleFollow()}
				/>
			) : (
				<div
					className={`btn btn-primary ${styles.followButton}`}
					onClick={() => toggleFollow()}
				/>
			);

		// If my profile
		if (me.username === profile.username) {
			return (
				<button
					className='btn btn-primary'
					onClick={() => setEditing(true)}>
					Edit
				</button>
			);
		}

		// Other profiles
		return (
			<>
				<FollowButton />
				<Link
					to={`/chat/${profile.username}`}
					className='btn btn-secondary'>
					Message
				</Link>
			</>
		);
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
