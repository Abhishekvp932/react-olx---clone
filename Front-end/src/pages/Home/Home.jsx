import React,{useEffect,useState} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import api from '../../api/api';
import './Home.css';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer'
function Home() {
const [products,setProducts] = useState([])

useEffect(()=>{
  api.get('/auth/products').then(res=>{
    setProducts(res.data)
  }).catch(err=>{
    console.log('products fetching error',err);
  })
},[])
    return (
    <>
      <div className="home-container">
        <Navbar />
        
        <div className="featured-banner">
          <h2>Featured Products</h2>
        </div>
        
        <div className="products-container">
          {products.map(product=>(
            <div className="product-card">
              <div className="product-image">
              <Link to={`/product/${product._id}`} key={product._id}>
                <img 
                    src={`http://localhost:2323/uploads/${product.productImage}`} 
                    alt={product.title}
                  />
                 </Link>
                <button className="favorite-btn">❤</button>
              </div>
              <div className="product-info">
                <h3 className="product-price">{product.price}</h3>
                <p className="product-title">{product.title}</p>
                <div className="product-meta">
                  <span className="product-location">{product.location}</span>
                  <span className="product-date"></span>
                </div>
              </div>
            </div>
             ))}
        </div>
      </div>
      <div>
     <Footer/>
      </div>
    </>
  );
}

export default Home;