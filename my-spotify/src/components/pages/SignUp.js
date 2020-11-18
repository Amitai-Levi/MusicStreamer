import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext"

export default function SignUp() {
	const { register, handleSubmit, errors } = useForm();
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmPasswordRef = useRef()
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { signup } = useAuth() 

	const onSubmit = async (data) => {
		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			setError('Passwords do not match')
		}
		try {
			setLoading(true)
			setError('')
			signup(emailRef.current.value, passwordRef.current.value)
		} catch {
			setError("Failed to sign up")
		}
		setLoading(false)
	};


  return (
    <>
      	<form className="form" onSubmit={handleSubmit(onSubmit)}>
      	  <div className="form-container">
						{error && <div>{error}</div>}

						<input 	type="email" 
										className="form-input" 
										name="email" 
										placeholder="E-Mail" 
										ref={(e) => {
											emailRef.current = e;
											register({required: true})
										}}/>
      	  	
						<input 	type="password" 
										className="form-input" 
										name="password" 
										placeholder="Password" 
										ref={(e) => {
											passwordRef.current = e;
											register({required: true})
										}}/>      	  	
						<input 	type="password" 
										className="form-input" 
										name="confirmPassword" 
										placeholder="Confrim Password" 
										ref={(e) => {
											confirmPasswordRef.current = e;
											register({required: true})
										}}/>      	  	
						{errors.exampleRequired && <span>This field is required</span>}
      	  	<button disabled={loading} type="submit" className="form-input" value="Sign Up">Sign Up</button>		
					</div>
				</form>
    </>
  );
}
