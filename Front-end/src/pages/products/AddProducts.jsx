import React, { useState } from 'react';
import './AddProduct.css';
import api from '../../api/api';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
function ProductAddPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: 'new',
    description: '',
    location: '',
    productImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        productImage: e.target.files[0] 
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('category', formData.category);
    formDataToSend.append('condition', formData.condition);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('productImage', formData.productImage); 

    try {
      const response = await api.post('/auth/addProducts', formDataToSend); 

      if (response.status === 200 || response.status === 201) {
        alert('Product added successfully!');
        setFormData({
          title: '',
          price: '',
          category: '',
          condition: 'new',
          description: '',
          location: '',
          productImage: null
        });
        navigate('/')
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while adding the product.');
    }
  };

  const categories = [
    'Electronics', 'Vehicles', 'Property', 'Furniture', 'Fashion',
    'Books & Hobbies', 'Sports', 'Pets', 'Services', 'Jobs', 'Other'
  ];

  return (
    <>
      <Navbar />
      <div className="product-page">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter product title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              placeholder="Enter product price"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="condition">Condition</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Describe the product"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter your location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="productImage">Product Image</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button type="submit">Post Ad</button>
        </form>
      </div>
      <div>
          <Footer/>
      </div>
    </>
  );
}

export default ProductAddPage;
