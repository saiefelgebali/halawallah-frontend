import { gql } from "@apollo/client";
import { PROFILE_FRAGMENT } from "./fragments";

export const LOGOUT = gql`
	mutation Logout($token: String!) {
		logout(token: $token)
		# Returns true or false
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser($username: String!, $password: String!) {
		createUser(username: $username, password: $password) {
			username
			display
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation CreateComment($post_id: Int!, $text: String!) {
		createComment(post_id: $post_id, text: $text) {
			comment_id
			text
			profile {
				username
				pfp
			}
		}
	}
`;

export const DELETE_POST = gql`
	mutation DeletePosst($post_id: Int!) {
		deletePost(post_id: $post_id)
	}
`;

export const UPDATE_PROFILE = gql`
	mutation UpdateProfile($display: String, $bio: String) {
		updateProfile(display: $display, bio: $bio) {
			...profile
		}
	}
	${PROFILE_FRAGMENT}
`;

export const FOLLOW = gql`
	mutation Follow($following_username: String!) {
		follow(following_username: $following_username) {
			...profile
		}
	}
	${PROFILE_FRAGMENT}
`;
