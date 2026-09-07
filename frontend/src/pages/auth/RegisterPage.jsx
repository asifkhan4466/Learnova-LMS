import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoleSelector from "../../components/RoleSelector";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  UsersIcon,
  CheckCircleIcon
} from "../../components/Icons";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (fullName.trim().length < 2) {
      setError("Full name must be at least 2 characters long.");
      return false;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address (e.g. name@example.com).");
      return false;
    }
    if (!password) {
      setError("Please enter a password.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please re-enter.");
      return false;
    }
    if (!agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy.");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      setTimeout(() => {
        if (role === "teacher") {
          navigate("/teacher/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      }, 700);
    }, 600);
  };

  const handleGoogleRegister = () => {
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        if (role === "teacher") {
          navigate("/teacher/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      }, 700);
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
          <h1 className="auth-page-title">Create Free Account</h1>
          <p className="auth-page-subtitle">
            Join over 150,000 learners and educators building the future with Learnova.
          </p>
        </div>

        {/* Role Selector */}
        <RoleSelector selectedRole={role} onChange={(r) => { setRole(r); setError(""); }} />

        {/* Alerts */}
        {error && (
          <div className="auth-alert error" role="alert">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-alert success" role="alert">
            <CheckCircleIcon size={18} className="alert-icon" />
            <span>Account created successfully! Preparing your {role} dashboard...</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="auth-actual-form">
          <div className="auth-field-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="auth-input-wrapper">
              <UsersIcon size={18} className="auth-field-icon" />
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); if (error) setError(""); }}
                placeholder="Sarah Connor"
                disabled={loading || success}
                autoComplete="name"
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="email">Email Address</label>
            <div className="auth-input-wrapper">
              <MailIcon size={18} className="auth-field-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                placeholder="sarah@example.com"
                disabled={loading || success}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="password">Password</label>
            <div className="auth-input-wrapper">
              <LockIcon size={18} className="auth-field-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }}
                placeholder="At least 6 characters"
                disabled={loading || success}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          <div className="auth-field-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="auth-input-wrapper">
              <LockIcon size={18} className="auth-field-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); if (error) setError(""); }}
                placeholder="Re-enter your password"
                disabled={loading || success}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
              </button>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="auth-options-row">
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => { setAgreedToTerms(e.target.checked); if (error) setError(""); }}
                disabled={loading || success}
              />
              <span>
                I agree to the Learnova{" "}
                <span className="auth-terms-link">Terms of Service</span> and{" "}
                <span className="auth-terms-link">Privacy Policy</span>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading || success}
          >
            {loading ? "Creating Account..." : `Create ${role.charAt(0).toUpperCase() + role.slice(1)} Account`}
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          {/* Google Sign Up */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="btn-google-auth"
            disabled={loading || success}
          >
            <GoogleIcon size={18} />
            <span>Sign Up with Google</span>
          </button>
        </form>

        {/* Switch to Login */}
        <div className="auth-footer-prompt">
          <span>Already have an account?</span>{" "}
          <Link to="/login" className="auth-link-highlight">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
