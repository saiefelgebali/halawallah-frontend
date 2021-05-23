import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { handleInvalid } from "../../util/form";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutation";

function RegisterPage() {
	// To enable redirecting
	const history = useHistory();

	const [error, setError] = useState({ message: null, type: null });

	const [createUser, { loading }] = useMutation(CREATE_USER);

	async function handleSubmit(event) {
		// Block default behaviour
		event.preventDefault();

		// Get form data
		const form = event.target;
		const fieldSet = form.querySelector("fieldset");

		const username = form.elements.username.value;
		const password = form.elements.password.value;
		// const email = form.elements.email.value;

		try {
			// Disable form while loading
			fieldSet.disabled = true;

			// Make Mutation & get details
			const res = await createUser({ variables: { username, password } });

			// Redirect to login page
			if (res) {
				history.push("/login");
			}
		} catch (e) {
			// Handle errors sent by server
			setError({ message: e.message, type: "danger" });
		}

		// Re-enable fieldset
		fieldSet.disabled = false;
	}

	return (
		<AuthLayout title='Register' loading={loading}>
			<form
				onSubmit={handleSubmit}
				onInvalid={(e) => handleInvalid(e, setError)}>
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
