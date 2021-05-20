import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";

function RegisterPage() {
	const [error, setError] = useState({ message: null, type: null });

	function handleSubmit(event) {
		// Block default behaviour
		event.preventDefault();

		// Get form data
		const form = event.target;
		const fieldSet = form.querySelector("fieldset");

		// const username = form.elements.username.value;
		// const email = form.elements.email.value;
		// const password = form.elements.password.value;

		try {
			// Disable form while loading
			fieldSet.disabled = true;

			// Make Mutation & get details
			/* 
			const res = await login({ variables: { username, password } });
			const { refreshToken, accessToken } = res.data?.login;

			console.log(accessToken, refreshToken);
			*/
		} catch (e) {
			// Handle errors sent by server
			setError({ message: e.message, type: "danger" });
		}

		// Re-enable fieldset
		fieldSet.disabled = false;
	}

	function handleInvalid(event) {
		// Block default behaviour
		event.preventDefault();

		event.target.classList.add("invalid");

		// Set warning error
		const fieldName = event.target.name;

		setError({
			message: `Check your entry for the ${fieldName} field`,
			type: "warning",
		});
	}

	return (
		<AuthLayout title='Register'>
			<form onSubmit={handleSubmit} onInvalid={handleInvalid}>
				<fieldset>
					<input
						type='text'
						className='form-control mb-3'
						placeholder='Username'
						name='username'
						required
					/>
					<input
						type='text'
						className='form-control mb-3'
						placeholder='Email Address'
						name='email'
						required
					/>
					<input
						type='password'
						className='form-control mb-3'
						placeholder='Password'
						name='password'
						required
					/>
					<input
						type='password'
						className='form-control mb-3'
						placeholder='Confirm Password'
						name='confirm password'
						required
					/>
					<input
						type='submit'
						className='form-control btn btn-primary mb-3'
						value='Create Account'
					/>
					<Link
						to='/login'
						className='form-control btn btn-secondary mb-3'>
						Login Instead
					</Link>
				</fieldset>
				<ErrorAlert error={error} />
			</form>
		</AuthLayout>
	);
}

export default RegisterPage;
