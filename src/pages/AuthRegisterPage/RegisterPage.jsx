import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { handleInvalid } from "../../util/form";
import ErrorAlert from "../../components/ErrorAlert/ErrorAlert";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { register } from "../../api/auth";

function RegisterPage() {
	// To enable redirecting
	const history = useHistory();

	const [error, setError] = useState({ message: null, type: null });
	const [loading, setLoading] = useState(false);

	async function handleSubmit(event) {
		// Block default behaviour
		event.preventDefault();

		// Get form data
		const form = event.target;
		const fieldSet = form.querySelector("fieldset");

		const username = form.elements.username.value;
		const password = form.elements.password.value;
		const confirm = form.elements.confirm.value;

		// Check password length
		if (password.length < 8) {
			return setError({
				message: "Password must be at least 8 characters long",
				type: "warning",
			});
		}

		// Check password match
		if (confirm !== password) {
			return setError({
				message: "Passwords do not match",
				type: "warning",
			});
		}

		try {
			// Disable form while loading
			setLoading(true);
			fieldSet.disabled = true;

			// Make Mutation & get details
			const res = await register({ username, password });

			// Redirect to login page
			if (res.username) {
				history.push("/login");
			} else if (!res.username) {
				// Handle 400 error
				setLoading(false);
				setError({ message: res, type: "warning" });
			}
		} catch (e) {
			// Handle 500 error
			console.log(e);
			setLoading(false);
			setError({ message: e, type: "danger" });
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
					{/* <input
						type='text'
						className='form-control mb-3'
						placeholder='Email Address'
						name='email'
						required
					/> */}
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
						name='confirm'
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
