import gql from "graphql-tag";

export const MESSAGES_SUBSCRIPTION = gql`
	subscription OnMessageCreated($room_id: Int!) {
		messageCreated(room_id: $room_id) {
			message_id
			text
			username
		}
	}
`;
