import { useQuery } from "@apollo/client";
import React, { useContext, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileEdit from "./ProfileEdit";
import { PROFILE_DETAILS } from "../../../../graphql/query";
import { ProfileContext } from "../../../../context/profileContext";

function ProfileHead({ username }) {
	// Check if this is my profile
	const me = useContext(ProfileContext);

	const { data } = useQuery(PROFILE_DETAILS, {
		variables: { username },
		fetchPolicy: "cache-first",
	});

	const profile = data?.getProfileByUsername;

	// Handle Edit mode
	const [editing, setEditing] = useState(false);

	if (!profile) return null;

	if (editing)
		return <ProfileEdit profile={profile} setEditing={setEditing} />;

	return <ProfileDetails profile={profile} me={me} setEditing={setEditing} />;
}

export default ProfileHead;
