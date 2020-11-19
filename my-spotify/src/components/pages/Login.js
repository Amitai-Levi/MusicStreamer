import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
  const { register, handleSubmit, errors } = useForm();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  useEffect(() => {
      emailRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-container">
          {error && <div>{error}</div>}
          <label htmlFor="email">E-Mail:</label>
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
          <label htmlFor="password">Password:</label>
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
          {errors.exampleRequired && <span>This field is required</span>}
          <button disabled={loading} type="submit" className="form-input">
            Login
          </button>
          <div>Need an account? {<Link style={{ textDecoration: 'none', color: "black"}} to="/signup">Sign Up</Link>}</div>
        </div>
      </form>
    </>
  );
}
