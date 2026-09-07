import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MailIcon, CheckCircleIcon, ArrowRightIcon } from "../../components/Icons";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        {/* Brand Header */}
        <div className="auth-brand-header">
          <Link to="/" className="auth-logo-link" aria-label="Learnova Home">
            <img src="/images/Logo.png" alt="Learnova Logo" className="auth-brand-logo" />
            <span className="auth-brand-name">Learnova</span>
          </Link>
          <h1 className="auth-page-title">Reset Your Password</h1>
          <p className="auth-page-subtitle">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {sent ? (
          <div className="auth-success-card">
            <div className="auth-success-icon-wrap">
              <CheckCircleIcon size={48} className="auth-check-icon" />
            </div>
            <h2>Password Reset Email Sent!</h2>
            <p>
              We've dispatched password reset instructions to <strong>{email}</strong>. If an account exists with this email, you will receive it shortly.
            </p>
            <p className="auth-spam-hint">
              Be sure to check your spam or junk folder if you don't see the email within a couple of minutes.
            </p>
            <div className="auth-success-actions">
              <button
                type="button"
                className="btn-auth-secondary"
                onClick={() => { setSent(false); setEmail(""); }}
              >
                Send to a different email
              </button>
              <Link to="/login" className="btn-auth-submit">
                Back to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-actual-form">
            {error && (
              <div className="auth-alert error" role="alert">
                <span>{error}</span>
              </div>
            )}

            <div className="auth-field-group">
              <label htmlFor="resetEmail">Email Address</label>
              <div className="auth-input-wrapper">
                <MailIcon size={18} className="auth-field-icon" />
                <input
                  type="email"
                  id="resetEmail"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                  placeholder="name@example.com"
                  disabled={loading}
                  autoComplete="email"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-auth-submit"
              disabled={loading}
            >
              {loading ? "Sending Reset Link..." : "Send Reset Link"}
            </button>

            <div className="auth-footer-prompt center-block">
              <Link to="/login" className="auth-link-highlight">
                ← Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
