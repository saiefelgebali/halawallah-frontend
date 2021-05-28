import gql from "graphql-tag";

export const PROFILE_FRAGMENT = gql`
	fragment profile on Profile {
		profile_id
		pfp
		display
		bio
		isFollowing
		user {
			username
		}
	}
`;

export const COMMENT_FRAGMENT = gql`
	fragment comment on Comment {
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

export const POST_FRAGMENT = gql`
	fragment post on Post {
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
				...comment
			}
		}
	}
	${COMMENT_FRAGMENT}
`;
