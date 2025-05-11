import React, { useState } from 'react';
import './signup.css';

import { useNavigate } from 'react-router-dom';

import api from '../../api/api';

function Signup() {
    const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const [errors, setErrors] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!form.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
          const response = await api.post('/auth/signup', form);
          console.log('Response:', response);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/')
        } catch (error) {
          console.error('Error:', error.response ? error.response.data : error.message);
        }   
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="signup-title">Create an Account</h1>
        </div>

        <div className="social-signup">
          <button className="social-btn google-btn">
            <i className="social-icon">G</i>
            Continue with Google
          </button>
        </div>

        <div className="divider">
          <span>OR</span>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              className="input-field"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <p style={{color:'red'}}>{errors.name}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="input-field"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="input-field"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="input-field"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <p style={{color:'red'}}>{errors.confirmPassword}</p>}
          </div>

          <div className="terms-container">
            <input type="checkbox" id="terms" className="checkbox" />
            <label htmlFor="terms" className="terms-label">
              I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="signup-btn">Create Account</button>
        </form>

        <div className="login-redirect">
          Already have an account? <a href="#" className="login-link">Log in</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
