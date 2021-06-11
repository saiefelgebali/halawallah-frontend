import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import {
	CREATE_MESSAGE,
	START_TYPING,
	STOP_TYPING,
} from "../../../../graphql/mutation";

function UserInput({ className, room_id }) {
	const [sendMessage] = useMutation(CREATE_MESSAGE, {
		variables: {
			room_id,
		},
	});
	const [startTyping] = useMutation(START_TYPING, {
		variables: {
			room_id,
		},
	});
	const [stopTyping] = useMutation(STOP_TYPING, {
		variables: {
			room_id,
		},
	});

	useEffect(() => {
		// On component unmount
		return () => {
			// Stop typing regardless
			stopTyping();
		};
	}, [stopTyping]);

	// When user inputs a message
	function handleChangeMessage(event) {
		// If text length is 2, make mutation 'startTyping'
		if (event.target.value.length === 2) startTyping();
		// If text length is less than 2 make mutation 'stopTyping'
		else if (event.target.value.length === 0) stopTyping();
	}

	// When user enters a message
	function handleSubmitMessage(event) {
		event.preventDefault();

		// 1. Compile message details
		const text = event.target.text.value;

		// 1b. Check text is empty
		if (text.match(/^ *$/) !== null) {
			return;
		}

		// 2. Make Mutation
		sendMessage({
			variables: {
				text,
			},
		});

		// 3. Clear input
		event.target.text.value = "";
	}

	return (
		<Navbar className={className} bottom>
			<form onSubmit={handleSubmitMessage}>
				<div className='input-group'>
					<input
						type='text'
						name='text'
						autoComplete='off'
						placeholder='Type a message'
						className='form-control'
						onChange={handleChangeMessage}
					/>
					<button className='btn btn-primary'>Send</button>
				</div>
			</form>
		</Navbar>
	);
}

export default UserInput;
