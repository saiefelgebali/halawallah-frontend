import { gql } from "@apollo/client";
import { PROFILE_FRAGMENT } from "./fragments";

export const LOGOUT = gql`
	mutation Logout($token: String!) {
		logout(token: $token)
		# Returns true or false
	}
`;

export const CREATE_USER = gql`
	mutation CreateUser($username: String!, $password: String!) {
		createUser(username: $username, password: $password) {
			username
			display
		}
	}
`;

export const CREATE_COMMENT = gql`
	mutation CreateComment($post_id: Int!, $text: String!) {
		createComment(post_id: $post_id, text: $text) {
			comment_id
			text
			profile {
				username
				pfp
			}
		}
	}
`;

export const DELETE_POST = gql`
	mutation DeletePost($post_id: Int!) {
		deletePost(post_id: $post_id)
	}
`;

export const DELETE_COMMENT = gql`
	mutation DeleteComment($comment_id: Int!) {
		deleteComment(comment_id: $comment_id)
	}
`;

export const UPDATE_PROFILE = gql`
	mutation UpdateProfile($display: String, $bio: String) {
		updateProfile(display: $display, bio: $bio) {
			...profile
		}
	}
	${PROFILE_FRAGMENT}
`;

export const FOLLOW = gql`
	mutation Follow($following_username: String!) {
		follow(following_username: $following_username) {
			...profile
		}
	}
	${PROFILE_FRAGMENT}
`;

export const CREATE_PUBLIC_CHAT = gql`
	mutation CreatePublicChat($profileUsernames: [String]!, $name: String) {
		createPublicChat(profileUsernames: $profileUsernames, name: $name) {
			room_id
			members {
				username
				pfp
			}
			public {
				name
				image
			}
		}
	}
`;

export const ADD_MEMBERS_TO_CHAT = gql`
	mutation AddMembersToChat($room_id: Int!, $usernames: [String]!) {
		addMembersToChatRoom(room_id: $room_id, profileUsernames: $usernames) {
			room_id
			members {
				username
				pfp
			}
			public {
				name
				image
			}
		}
	}
`;

export const UPDATE_CHAT_NAME = gql`
	mutation UpdateChatName($room_id: Int!, $name: String!) {
		updatePublicChatName(room_id: $room_id, name: $name) {
			room_id
			members {
				username
				pfp
			}
			public {
				name
				image
			}
		}
	}
`;

export const LEAVE_PUBLIC_CHAT = gql`
	mutation LeavePublicChat($room_id: Int!, $username: String!) {
		removeMembersFromChatRoom(
			room_id: $room_id
			profileUsernames: [$username]
		) {
			room_id
			members {
				username
				pfp
			}
			public {
				name
				image
			}
		}
	}
`;

export const CREATE_MESSAGE = gql`
	mutation CreateMessage($room_id: Int!, $text: String!) {
		createMessage(room_id: $room_id, text: $text) {
			message_id
			text
			username
		}
	}
`;

export const START_TYPING = gql`
	mutation StartTyping($room_id: Int!) {
		startTyping(room_id: $room_id)
	}
`;

export const STOP_TYPING = gql`
	mutation StopTyping($room_id: Int!) {
		stopTyping(room_id: $room_id)
	}
`;
