import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Login({ role }) {
  const navigate = useNavigate();
  const { search, state } = useLocation();
  const backParams = new URLSearchParams(search);
  if (["admin", "subadmin"].includes(role.id)) backParams.set("group", "admin");
  const backQuery = backParams.toString() ? `?${backParams}` : "";
  const forgotParams = new URLSearchParams(search);
  forgotParams.set("role", role.id);
  return (
    <div className="auth-page">

      <div className="login-card">

        <div className="auth-header">
          <h1>Welcome {role.name}</h1>

          <p>
            {role.subtitle}
          </p>
        </div>

        <form className="login-form" onSubmit={event => { event.preventDefault(); navigate(role.id === "student" && new URLSearchParams(search).get("course") ? `/student/payments?course=${encodeURIComponent(new URLSearchParams(search).get("course"))}` : `/${role.id}/dashboard`, { replace: true }); }}>

          <div className="form-group">
            <label htmlFor="login-identifier">Email or User ID</label>

            <input
              type="text"
              id="login-identifier"
              autoComplete="username"
              placeholder="Enter your email or user ID"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>

            <input
              type="password"
              id="login-password"
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              Remember me
            </label>

            <Link to={`/forgot-password?${forgotParams}`} state={state}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="login-submit">
            Login
          </button>

        </form>

        {role.id === "student" && <div className="register-link">
          Don't have an account?
          <Link to={`/register${search}`} state={state}> Create Account</Link>
        </div>}

        <Link className="login-role-back" to={`/login${backQuery}`} state={state}>Back to role selection</Link>

      </div>

    </div>
  );
}

export default Login;