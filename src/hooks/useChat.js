import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CHAT_ROOMS } from "../graphql/query";
import { PROFILE_MESSAGES_SUBSCRIPTION } from "../graphql/subscription";
import { cache } from "../cache";

function useChat() {
	const { data, subscribeToMore } = useQuery(CHAT_ROOMS);
	const [subscribed, setSubscribed] = useState(false);
	const [newMessage, setNewMessage] = useState();

	useEffect(() => {
		// Setup subscription to chat rooms
		function makeSubscription() {
			const rooms = data.getProfileChatRooms.map((room) => room.room_id);

			// Subscribe to listen for all rooms a current profile is in
			subscribeToMore({
				document: PROFILE_MESSAGES_SUBSCRIPTION,

				variables: {
					rooms,
				},

				async updateQuery(prev, { subscriptionData }) {
					const newMessage = subscriptionData.data.messageCreated;

					// Get message room data
					const messageRoom = data.getProfileChatRooms.find(
						(room) => room.room_id === newMessage.room.room_id
					);

					// Update message state
					setNewMessage({ ...newMessage, room: messageRoom });

					// Update cached data to include new message
					cache.modify({
						id: cache.identify({
							__typename: "ChatRoom",
							room_id: newMessage.room.room_id,
						}),
						fields: {
							messages(prevMessages) {
								return {
									...prevMessages,
									count: prevMessages.count + 1,
									data: [newMessage, ...prevMessages.data],
								};
							},
						},
					});
				},
			});

			// Update subscribed boolean state
			setSubscribed(true);
		}
		// Ensure subscription is made only once
		if (subscribed) return;
		if (!data) return;

		// Make subscription only once when data has been loaded
		makeSubscription();
	}, [data, subscribed, subscribeToMore]);

	// Function clears newMessage state
	function clearMessage() {
		setNewMessage();
	}

	return { newMessage, clearMessage };
}

export default useChat;
