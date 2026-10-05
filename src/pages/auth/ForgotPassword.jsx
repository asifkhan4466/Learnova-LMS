import { useState } from "react";
import "./ForgotPassword.css";
import { Link, useLocation } from "react-router-dom";
import { loginRoles } from "./loginRoles";

function ForgotPassword() {
  const [message,setMessage] = useState("");
  const { search, state } = useLocation();
  const params = new URLSearchParams(search);
  const role = loginRoles.find(role => role.id === params.get("role"));
  params.delete("role");
  const returnSearch = params.toString() ? `?${params}` : "";
  return (
    <div className="auth-page">

      <div className="forgot-card">

        <div className="auth-header">
          <h1>Forgot Password?</h1>

          <p>
            Enter your email or User ID and we'll help you
            reset your password.
          </p>
        </div>

        <form className="forgot-form" onSubmit={event => { event.preventDefault(); setMessage("Password recovery requires the backend. No reset email has been sent."); }}>

          <div className="form-group">
            <label>Email or User ID</label>

            <input
              type="text"
              placeholder="Enter your email or User ID"
            />
          </div>

          <button
            type="submit"
            className="forgot-submit"
          >
            Continue
          </button>

        </form>
          {message && <p role="status">{message}</p>}

        <div className="back-login">
          <Link to={`${role ? `/login/${role.path || role.id}` : "/login"}${returnSearch}`} state={state}>
            ← Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;