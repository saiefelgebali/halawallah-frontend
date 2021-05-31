import gql from "graphql-tag";
import {
	POST_FRAGMENT,
	COMMENT_FRAGMENT,
	PROFILE_FRAGMENT,
	CHAT_ROOM_FRAGMENT,
	MESSAGE_FRAGMENT,
} from "./fragments";

export const ME = gql`
	query Me {
		me {
			username
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
				...post
			}
		}
	}
	${POST_FRAGMENT}
`;

export const PROFILE_DETAILS = gql`
	query ProfileDetails($username: String!) {
		getProfile(username: $username) {
			...profile
		}
	}
	${PROFILE_FRAGMENT}
`;
export const PROFILE_POSTS = gql`
	query ProfilePosts($username: String!, $offset: Int!, $limit: Int!) {
		getPostsByProfile(username: $username, offset: $offset, limit: $limit) {
			count
			hasMore
			data {
				...post
			}
		}
	}
	${POST_FRAGMENT}
`;

export const SEARCH_PROFILE = gql`
	query SearchProfile($query: String!, $offset: Int!, $limit: Int!) {
		searchProfile(query: $query, offset: $offset, limit: $limit) {
			count
			hasMore
			data {
				username
				pfp
			}
		}
	}
`;

export const POST_COMMENTS = gql`
	query PostComments($post_id: Int!, $offset: Int!, $limit: Int!) {
		getCommentsByPost(post_id: $post_id, offset: $offset, limit: $limit) {
			count
			hasMore
			data {
				...comment
			}
		}
	}
	${COMMENT_FRAGMENT}
`;

export const POST = gql`
	query Post($post_id: Int!) {
		getPostById(post_id: $post_id) {
			...post
		}
	}
	${POST_FRAGMENT}
`;

export const CHAT_ROOMS = gql`
	query ChatRooms($offset: Int!, $limit: Int!) {
		getProfileChatRooms(offset: $offset, limit: $limit) {
			count
			hasMore
			data {
				room_id
				group {
					name
					image
				}
				messages(offset: 0, limit: 10) {
					count
					hasMore
					data {
						message_id
						text
						profile {
							username
						}
					}
				}
				members {
					pfp
					username
				}
			}
		}
	}
`;

export const CHAT_ROOM = gql`
	query ChatRoom($room_id: Int!) {
		getChatRoomById(room_id: $room_id) {
			...chatRoom
		}
	}
	${CHAT_ROOM_FRAGMENT}
`;

export const CHAT_ROOM_MESSAGES = gql`
	query ChatRoomMessages($room_id: Int!, $offset: Int!, $limit: Int) {
		getChatRoomMessages(room_id: $room_id, offset: $offset, limit: $limit) {
			count
			hasMore
			data {
				...message
			}
		}
	}
	${MESSAGE_FRAGMENT}
`;
