import React from "react";
import Navbar from "../../../../components/Navbar/Navbar";

function UserInput({ className }) {
	return (
		<Navbar className={className} bottom>
			<div className='input-group'>
				<input type='text' className='form-control' />
				<button className='btn btn-primary'>Send</button>
			</div>
		</Navbar>
	);
}

export default UserInput;
