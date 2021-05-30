import React from "react";
import { useParams } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ChatRoomPage.module.scss";
import ChatRoomDetails from "./components/ChatRoomDetails/ChatRoomDetails";

function ChatRoomPage() {
	const { room_id } = useParams();

	return (
		<div className={styles.chatRoom}>
			<ChatRoomDetails className={styles.header} />
			<div className={styles.messages}>
				<div>Hi</div>
				<div>Hi</div>
				<div>Hi</div>
			</div>
			<Navbar className={styles.userInput} bottom>
				<div className='input-group'>
					<input type='text' className='form-control' />
					<button className='btn btn-primary'>Send</button>
				</div>
			</Navbar>
		</div>
	);
}

export default ChatRoomPage;
