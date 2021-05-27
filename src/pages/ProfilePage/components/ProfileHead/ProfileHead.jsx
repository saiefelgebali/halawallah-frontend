import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileEdit from "./ProfileEdit";
import { PROFILE_DETAILS } from "../../../../graphql/query";

function ProfileHead({ username }) {
	const { data } = useQuery(PROFILE_DETAILS, {
		variables: { username },
		fetchPolicy: "cache-first",
	});

	const profile = data?.getProfileByUsername;

	// Handle Edit mode
	const [editing, setEditing] = useState(false);

	if (editing)
		return <ProfileEdit profile={profile} setEditing={setEditing} />;

	return <ProfileDetails profile={profile} setEditing={setEditing} />;
}

export default ProfileHead;
