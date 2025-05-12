import React,
  { createContext, useState, useEffect, useContext }
  from 'react';
import { BrowserRouter as Router, Routes, Route }
  from 'react-router-dom';

import Home   from './pages/Home/Home';
import Signup from './pages/signup/signup';
import Login  from './pages/Login/Login';
import ProductAdd from './pages/products/AddProducts'
import ProductDetails from './pages/products/productDetails';
export const UserContext = createContext({
  user: null,
  setUser: () => {}
});


export const useUser = () => useContext(UserContext);

function App() {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });


  useEffect(() => {
    if (user)
      localStorage.setItem('user', JSON.stringify(user));
    else
      localStorage.removeItem('user');
  }, [user]);

  return (
   
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addProducts' element={<ProductAdd />} />
        <Route path ='/product/:id' element = {<ProductDetails/>}/>
      </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
