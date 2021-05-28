import { gql } from "@apollo/client";
import { PROFILE_FRAGMENT } from "./fragments";

export const LOGIN = gql`
	mutation Login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			refreshToken
			accessToken
		}
	}
`;

export const LOGOUT = gql`
	mutation Logout($token: String!) {
		logout(token: $token)
		# Returns true or false
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser($username: String!, $password: String!) {
		createUser(username: $username, password: $password) {
			user {
				username
			}
			profile_id
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
				profile_id
				pfp
				user {
					username
				}
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
	mutation Follow($following_id: Int!) {
		follow(following_id: $following_id) {
			...profile
		}
	}
	${PROFILE_FRAGMENT}
`;
