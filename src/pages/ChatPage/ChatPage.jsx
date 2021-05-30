import React from "react";
import { Link } from "react-router-dom";
import styles from "./ChatPage.module.scss";

function ChatPage() {
	// temp
	const chatRooms = [
		{
			room_id: 1,
			name: "Al Muneera Hood",
			image: "http://192.168.1.111:5000/api/media/img/post/saief-1622375387353.png",
			messages: ["hi", "wag1", "wys"],
		},
		{
			room_id: 2,
			name: "The Muneera Hood",
			image: "http://192.168.1.111:5000/api/media/img/post/saief-1622375387353.png",
			messages: ["Ayo big up my guy", "wag1", "wys"],
		},
		{
			room_id: 3,
			name: "Not Muneera Hood",
			image: "http://192.168.1.111:5000/api/media/img/post/saief-1622375387353.png",
			messages: [
				"lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsd asd asdumloremipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
				"wag1",
				"wys",
			],
		},
	];

	const ChatRooms = () =>
		chatRooms.map((room) => (
			<Link
				key={room.room_id}
				className={styles.chatRoom}
				to={`/chat/${room.room_id}`}>
				<div className={styles.image}>
					<img src={room.image} alt='' />
				</div>
				<div className={styles.details}>
					<div className={styles.name}>{room.name}</div>
					<div className={styles.latestMessage}>
						{room.messages[0]}
					</div>
				</div>
			</Link>
		));

	return (
		<div className={styles.chatPage}>
			<h1 className={styles.title}>Messages</h1>
			<div className={styles.chatRooms}>
				<ChatRooms />
			</div>
		</div>
	);
}

export default ChatPage;
