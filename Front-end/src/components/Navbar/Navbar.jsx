import React ,{useState,useEffect}from 'react'
import './Navbar.css'
import { useNavigate} from 'react-router-dom';
function Navbar() {

  const [userName,setUserName] = useState('')
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.name){
      setUserName(user.name)
    }
  },[])
 const navigate = useNavigate()
    const handleLogin = ()=>{
       navigate('/login');
    }

    const handleLogout = ()=>{
       localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserName('');
        navigate('/login');
    }
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
        
          <div className="logo">
            OLX<span>.</span>
          </div>
          
          <div className="search-container">
            <div className="search-bar">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Find Cars, Mobile Phones and more..." 
              />
              <button className="search-button">
                <i className="search-icon">🔍</i>
              </button>
            </div>
          </div>
          
                    <div className="nav-links">
            <div className="nav-item user-dropdown">
              <i className="nav-icon">👤</i>
              {userName ? (
                <>
                  <span className="username">Welcome, {userName}</span>
                  <div className="logout-dropdown">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </>
              ) : (
                <a href="#" onClick={handleLogin}>Login</a>
              )}
            </div>

            <div className="nav-item">
              <i className="nav-icon">❤️</i>
              Favorites
            </div>
            <div className="nav-item sell-button">
              <i className="nav-icon">➕</i>
              SELL
            </div>
          </div>
        </div>
      </nav>
       <div className="categories-bar">
        <div className="categories-container">
          <div className="category-item">🚗 Cars</div>
          <div className="category-item">🏠 Properties</div>
          <div className="category-item">📱 Mobile Phones</div>
          <div className="category-item">💼 Jobs</div>
          <div className="category-item">🏍️ Bikes</div>
          <div className="category-item">💻 Electronics</div>
          <div className="category-item">🛋️ Furniture</div>
          <div className="category-item">👕 Fashion</div>
        </div>
      </div>
    </>
  );
}

export default Navbar