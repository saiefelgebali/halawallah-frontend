import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";

function UserInput({ className }) {
	// When user enters a message
	function handleSubmitMessage(event) {
		event.preventDefault();

		// 1. Compile message details
		const text = event.target.text.value;
		console.log(text);

		// 2. Send send socket event

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
