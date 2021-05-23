import gql from "graphql-tag";
import { POSTS_FRAGMENT } from "./fragments";

export const ME = gql`
	query Me {
		me {
			profile_id
			user {
				username
			}
			pfp
		}
	}
`;

export const FEED = gql`
	query Feed($offset: Int!, $limit: Int!) {
		feed(offset: $offset, limit: $limit) {
			count
			hasMore
			data {
				...posts
			}
		}
	}
	${POSTS_FRAGMENT}
`;

export const PROFILE_DETAILS = gql`
	query ProfileDetails($username: String!) {
		getProfileByUsername(username: $username) {
			profile_id
			display
			bio
			pfp
			user {
				username
			}
		}
	}
`;
export const PROFILE_POSTS = gql`
	query ProfilePosts($username: String!, $offset: Int!, $limit: Int!) {
		getPostsByUsername(
			username: $username
			offset: $offset
			limit: $limit
		) {
			count
			hasMore
			data {
				...posts
			}
		}
	}
	${POSTS_FRAGMENT}
`;
