import gql from "graphql-tag";
import { POSTS, PROFILE_POSTS } from "./fragments";

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
	${POSTS}
`;

export const PROFILE = gql`
	query Profile($username: String!, $offset: Int!, $limit: Int!) {
		getProfileByUsername(username: $username) {
			profile_id
			display
			bio
			pfp
			user {
				username
			}
			posts(offset: $offset, limit: $limit) {
				...profilePosts
			}
		}
	}
	${PROFILE_POSTS}
`;
