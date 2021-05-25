import gql from "graphql-tag";

export const COMMENTS_FRAGMENT = gql`
	fragment comments on Comment {
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
`;

export const POSTS_FRAGMENT = gql`
	fragment posts on Post {
		post_id
		image
		caption
		created_at
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
				...comments
			}
		}
	}
	${COMMENTS_FRAGMENT}
`;
