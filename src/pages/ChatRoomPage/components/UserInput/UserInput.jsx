import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";

function UserInput({ className, handleSubmit }) {
	return (
		<Navbar className={className} bottom>
			<form onSubmit={handleSubmit}>
				<div className='input-group'>
					<input type='text' className='form-control' />
					<button className='btn btn-primary'>Send</button>
				</div>
			</form>
		</Navbar>
	);
}

export default UserInput;
