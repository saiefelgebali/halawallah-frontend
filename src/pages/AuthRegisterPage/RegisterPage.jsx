import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import styles from "./RegisterPage.module.scss";

function RegisterPage() {
	return (
		<AuthLayout title='Register'>
			<form action='' className={styles.form}>
				<div className='input-group mb-3'>
					<input
						type='text'
						className='form-control'
						placeholder='First Name'
					/>
					<input
						type='text'
						className='form-control'
						placeholder='Last Name'
					/>
				</div>
				<input
					type='text'
					className='form-control mb-3'
					placeholder='Username'
				/>
				<input
					type='text'
					className='form-control mb-3'
					placeholder='Email Address'
				/>
				<input
					type='password'
					className='form-control mb-3'
					placeholder='Password'
				/>
				<input
					type='password'
					className='form-control mb-3'
					placeholder='Confirm Password'
				/>
				<input
					type='submit'
					className='form-control btn btn-primary mb-3'
					value='Create Account'
				/>
				<Link to='/login' className='form-control btn btn-secondary'>
					Login Instead
				</Link>
			</form>
		</AuthLayout>
	);
}

export default RegisterPage;
