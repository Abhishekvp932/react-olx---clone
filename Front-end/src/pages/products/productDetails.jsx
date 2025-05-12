import React,{useEffect,useState} from 'react';
import './productDetails.css'
import { useNavigate,useParams } from 'react-router-dom';
import api from '../../api/api'
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
function ProductDetails() {
  const {id} = useParams()
  const [product,setProducts] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    api.get(`/auth/product/${id}`).then(res=>{
      setProducts(res.data)
    }).catch(error=>{
      console.log('product details page data fetching errors',error)
    })
  },[id])


  if (!product) {
    return <div className="loading">Loading…</div>;
  }

  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div className="product-details-page">
      <button
      className="back-button"
      onClick={() => navigate(-1)}
    >
      ← Back
    </button>
      <div className="product-details-container">
      
        <div className="gallery-section">
          <div className="main-image-container">
            <button className="gallery-nav prev">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <img 
              src={`http://localhost:2323/uploads/${product.productImage}`}
              alt 
              className="main-image"
            />
            <button className="gallery-nav next" >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
    
        <div className="product-info-section">
          <div className="product-info-container">
            <div className="product-header">
              <h1 className="product-title"></h1>
              <div className="product-price">${product.price}</div>
              <div className="product-metadata">
                <span className="location">{product.location}</span>
                <span className="separator">•</span>
               <span className="date">
                Posted on {new Date(product.createdAt).toLocaleDateString()}
              </span>
              </div>
            </div>
            <div className="details-section">
              <h2 className="section-title">Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Condition</span>
                  <span className="detail-value">{product.condition}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Category</span>
                  <span className="detail-value">{product.category}</span>
                </div>
              </div>
            </div>
            <div className="description-section">
              <h2 className="section-title">Description</h2>
              <p className="description-text">{product.description}</p>
            </div>
          </div>
          <div className="seller-section">            
            <div className="seller-actions">
              <button className="action-button call">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Call Seller
              </button>
              <button className="action-button chat">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                Chat with Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
        <Footer/>
    </div>
    </>
  );
}

export default ProductDetails;