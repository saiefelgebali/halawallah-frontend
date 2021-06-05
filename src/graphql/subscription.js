import gql from "graphql-tag";

export const MESSAGES_SUBSCRIPTION = gql`
	subscription OnMessageCreated($room_id: Int!) {
		messageCreated(rooms: [$room_id]) {
			message_id
			text
			username
			room {
				room_id
			}
		}
	}
`;

export const PROFILE_MESSAGES_SUBSCRIPTION = gql`
	subscription OnMessageCreated($rooms: [Int]!) {
		messageCreated(rooms: $rooms) {
			message_id
			text
			username
			room {
				room_id
			}
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
