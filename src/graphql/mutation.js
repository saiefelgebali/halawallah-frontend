import { gql } from "@apollo/client";

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
