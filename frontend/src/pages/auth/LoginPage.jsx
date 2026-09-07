import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoleSelector from "../../components/RoleSelector";
import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  SparklesIcon,
  CheckCircleIcon
} from "../../components/Icons";

export default function LoginPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
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
      setError("Please enter your password.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    // Simulate authentication delay for friendly user experience
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Navigate according to role
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

  const handleGoogleLogin = () => {
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
          <h1 className="auth-page-title">Welcome Back</h1>
          <p className="auth-page-subtitle">
            Sign in to continue your learning journey and access your projects.
          </p>
        </div>

        {/* Role Selector */}
        <RoleSelector selectedRole={role} onChange={(r) => { setRole(r); setError(""); }} />

        {/* Status Messages */}
        {error && (
          <div className="auth-alert error" role="alert">
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="auth-alert success" role="alert">
            <CheckCircleIcon size={18} className="alert-icon" />
            <span>Success! Redirecting to your {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="auth-actual-form">
          <div className="auth-field-group">
            <label htmlFor="email">Email Address</label>
            <div className="auth-input-wrapper">
              <MailIcon size={18} className="auth-field-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                placeholder="name@example.com"
                disabled={loading || success}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field-group">
            <div className="auth-field-header">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="auth-forgot-link">
                Forgot password?
              </Link>
            </div>
            <div className="auth-input-wrapper">
              <LockIcon size={18} className="auth-field-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); if (error) setError(""); }}
                placeholder="Enter your password"
                disabled={loading || success}
                autoComplete="current-password"
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

          {/* Remember Me */}
          <div className="auth-options-row">
            <label className="auth-checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading || success}
              />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="btn-auth-submit"
            disabled={loading || success}
          >
            {loading ? "Signing in..." : `Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
          </button>

          {/* Divider */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn-google-auth"
            disabled={loading || success}
          >
            <GoogleIcon size={18} />
            <span>Continue with Google</span>
          </button>
        </form>

        {/* Switch to Register */}
        <div className="auth-footer-prompt">
          <span>Don't have a Learnova account?</span>{" "}
          <Link to="/register" className="auth-link-highlight">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
