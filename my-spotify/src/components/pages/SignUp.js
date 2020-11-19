import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUp() {
  const { register, handleSubmit, errors } = useForm();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();

  const onSubmit = async (data) => {
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setLoading(true);
      setError("");
	  await signup(emailRef.current.value, passwordRef.current.value);
	  history.push("/");
    } catch {
      setError("Failed to sign up");
    }
    setLoading(false);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          {error && <div>{error}</div>}
		  <label htmlFor="email">
			E-Mail:
		  </label>
          <input
            type="email"
            className="form-input"
            name="email"
			id="email"
            placeholder="E-Mail"
            ref={(e) => {
              emailRef.current = e;
              register({ required: true });
            }}
          />
		  <label htmlFor="password">
			  Password:
		  </label>
          <input
            type="password"
            className="form-input"
            name="password"
			id="password"
            placeholder="Password"
            ref={(e) => {
              passwordRef.current = e;
              register({ required: true });
            }}
          />
		  <label htmlFor="confirmPassword">
			Confirm Password:
		  </label>
          <input	
            type="password"
            className="form-input"
            name="confirmPassword"
			id="confirmPassword"
            placeholder="Confrim Password"
            ref={(e) => {
              confirmPasswordRef.current = e;
              register({ required: true });
            }}
          />
          {errors.exampleRequired && <span>This field is required</span>}
          <button disabled={loading} type="submit" className="form-input">
            Sign Up
          </button>
		  <div>
		  	Already have an account? <Link to="/login" style={{ textDecoration: "none", color: "black"}}> Sign In</Link>
		  </div>
        </div>
      </form>
    </>
  );
}
