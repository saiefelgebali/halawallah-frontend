import gql from "graphql-tag";

export const PROFILE_FRAGMENT = gql`
	fragment profile on Profile {
		username
		pfp
		display
		bio
		isFollowing
	}
`;

export const COMMENT_FRAGMENT = gql`
	fragment comment on Comment {
		comment_id
		text
		profile {
			username
			pfp
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
			username
			pfp
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
