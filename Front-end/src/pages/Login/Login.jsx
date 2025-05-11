import React from 'react'
import { useNavigate } from 'react-router-dom';

import './Login.css'
function Login() {
   const navigate = useNavigate()
    const handle = ()=>{
        navigate('/signup');
    }
 return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Log in to your account</p>
        </div>
        
        <div className="social-login">
          <button className="social-btn google-btn">
            <i className="social-icon">G</i>
            Continue with Google
          </button>
         </div>
        
        <div className="divider">
          <span>OR</span>
        </div>
        
        <form className="login-form">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email address" 
              className="input-field"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              className="input-field"
            />
            <div className="password-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" className="checkbox" />
                <label htmlFor="remember" className="remember-label">
                  Remember me
                </label>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
          </div>
          
          <button type="submit" className="login-btn">Log In</button>
        </form>
        
        <div className="signup-redirect">
          Don't have an account? <a href="#" className="signup-link" onClick={handle} >Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login