import { gql } from "@apollo/client";

export const ME = gql`
	query Me {
		me {
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
				post_id
				image
				caption
				profile {
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
							pfp
							user {
								username
							}
						}
					}
				}
			}
		}
	}
`;
