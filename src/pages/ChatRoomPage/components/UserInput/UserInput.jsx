import { useMutation } from "@apollo/client";
import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";
import { CREATE_MESSAGE } from "../../../../graphql/mutation";

function UserInput({ className, room_id }) {
	const [sendMessage] = useMutation(CREATE_MESSAGE, {
		variables: {
			room_id,
		},
	});

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
					<input type='text' name='text' className='form-control' />
					<button className='btn btn-primary'>Send</button>
				</div>
			</form>
		</Navbar>
	);
}

export default UserInput;
