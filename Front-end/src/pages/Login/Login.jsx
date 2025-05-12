import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'
import './Login.css'
import {useUser} from '../../App'
function Login() {
  const [form,setForm] = useState({email:'',password:''})
  const [err,setErr] = useState({email:'',password:''})
   const navigate = useNavigate()

   const {setUser} = useUser();
  const validate = ()=>{
   let isValidate = true
     const newError = {email:'',password:""}
     
     if(!form.email){
      newError.email = 'Email is required'
      isValidate = false
     }
     if(!form.password){
      newError.password = 'password is required'
      isValidate = false
     }
     setErr(newError)
     return isValidate;
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()

    if(validate()){
      try {
        const response = await api.post('/auth/login',form)
        console.log('response',response)
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setUser(response.data.user)
        navigate('/')
      } catch (error) {
        console.log('user login error',error)
        alert('user login error')
      }
    }
  }

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
        
        <form className="login-form" onSubmit={handleSubmit}>
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
             {err.email  && <p style={{color:'red'}}>{err.email}</p>}
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
             {err.password && <p style={{color:'red'}}>{err.password}</p>}
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