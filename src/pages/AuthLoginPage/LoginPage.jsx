import React from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import { Link } from "react-router-dom";
import styles from "./LoginPage.module.scss";

function LoginPage() {
	return (
		<AuthLayout title='Login'>
			<form action='' className={styles.form}>
				<input
					type='text'
					placeholder='Username'
					className='form-control mb-3'
				/>
				<input
					type='password'
					placeholder='Password'
					className='form-control mb-3'
				/>
				<input
					type='submit'
					placeholder='Password'
					className='form-control btn btn-primary mb-3'
					value='Login'
				/>
				<div className='input-group mb-3'>
					<Link
						to={"/register"}
						className={`form-control btn btn-secondary`}>
						Register an Account Instead
					</Link>
				</div>
			</form>
		</AuthLayout>
	);
}

export default LoginPage;
