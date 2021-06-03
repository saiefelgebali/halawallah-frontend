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

export const MESSAGE_TYPING_SUBSCRIPTION = gql`
	subscription OnMessageTyping($room_id: Int!) {
		messageTyping(room_id: $room_id) {
			username
			isTyping
		}
	}
`;
