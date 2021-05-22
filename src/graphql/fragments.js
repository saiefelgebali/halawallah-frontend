import gql from "graphql-tag";

export const POSTS = gql`
	fragment posts on Post {
		post_id
		image
		caption
		profile {
			profile_id
			pfp
			user {
				username
			}
		}
		comments(offset: 0, limit: 3) {
			count
			hasMore
			data {
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
	}
`;

export const PROFILE_POSTS = gql`
	fragment profilePosts on PaginatedPosts {
		count
		hasMore
		data {
			...posts
		}
	}
	${POSTS}
`;
