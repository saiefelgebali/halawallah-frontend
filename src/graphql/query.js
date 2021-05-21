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
