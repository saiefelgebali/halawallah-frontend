import gql from "graphql-tag";
import { POST_FRAGMENT, COMMENT_FRAGMENT, PROFILE_FRAGMENT } from "./fragments";

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
				...post
			}
		}
	}
	${POST_FRAGMENT}
`;

export const PROFILE_DETAILS = gql`
	query ProfileDetails($username: String!) {
		getProfileByUsername(username: $username) {
			...profile
		}
	}
	${PROFILE_FRAGMENT}
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
				...post
			}
		}
	}
	${POST_FRAGMENT}
`;

export const SEARCH_PROFILE = gql`
	query SearchProfile($query: String!, $offset: Int!, $limit: Int!) {
		searchProfile(query: $query, offset: $offset, limit: $limit) {
			count
			hasMore
			data {
				profile_id
				pfp
				user {
					username
				}
			}
		}
	}
`;

export const POST_COMMENTS = gql`
	query PostComments($post_id: Int!, $offset: Int!, $limit: Int!) {
		getCommentsByPost(post_id: $post_id, offset: $offset, limit: $limit) {
			count
			hasMore
			data {
				...comment
			}
		}
	}
	${COMMENT_FRAGMENT}
`;

export const POST = gql`
	query Post($post_id: Int!) {
		getPostById(post_id: $post_id) {
			...post
		}
	}
	${POST_FRAGMENT}
`;
