import React, { useContext, useState } from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphql/mutation";
import { Store } from "../../store/store";
import { login as loginAction } from "../../store/actions";

function LoginPage() {
	// Login State Management
	const { dispatch } = useContext(Store);

	const [error, setError] = useState({ message: null, type: null });

	const [login, { loading }] = useMutation(LOGIN);

	// Handle submit login form
	async function handleSubmit(event) {
		// Cancel default action
		event.preventDefault();

		// Define form & fieldset
		const form = event.target;
		const fieldSet = form.querySelector("fieldset");

		// Extract username & password from form
		const username = form.elements.username.value;
		const password = form.elements.password.value;

		try {
			// Disable form while loading
			fieldSet.disabled = true;

			// Make Mutation & get tokens
			const res = await login({ variables: { username, password } });
			const { refreshToken, accessToken } = res.data?.login;

			// Save Login Details
			loginAction(dispatch, { refreshToken, accessToken });
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
		<AuthLayout title='Login' loading={loading}>
			<form onSubmit={handleSubmit} onInvalid={handleInvalid}>
				<fieldset>
					<input
						type='text'
						name='username'
						placeholder='Username'
						className='form-control mb-3'
						required
					/>
					<input
						type='password'
						name='password'
						placeholder='Password'
						className='form-control mb-3'
						required
					/>
					<input
						type='submit'
						placeholder='Password'
						className='form-control btn btn-primary mb-3'
						value='Login'
					/>
					<Link
						to={"/register"}
						className='form-control btn btn-secondary mb-3'>
						Register an Account Instead
					</Link>
				</fieldset>
				<ErrorAlert error={error} />
			</form>
		</AuthLayout>
	);
}

export default LoginPage;
