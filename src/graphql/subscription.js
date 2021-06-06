import gql from "graphql-tag";
import { MESSAGE_FRAGMENT } from "./fragments";

export const MESSAGES_SUBSCRIPTION = gql`
	subscription OnMessageCreated($room_id: Int!) {
		messageCreated(rooms: [$room_id]) {
			...message
		}
	}
	${MESSAGE_FRAGMENT}
`;

export const PROFILE_MESSAGES_SUBSCRIPTION = gql`
	subscription OnMessageCreated($rooms: [Int]!) {
		messageCreated(rooms: $rooms) {
			...message
		}
	}
	${MESSAGE_FRAGMENT}
`;

export const MESSAGE_TYPING_SUBSCRIPTION = gql`
	subscription OnMessageTyping($room_id: Int!) {
		messageTyping(room_id: $room_id) {
			username
			isTyping
		}
	}
`;
