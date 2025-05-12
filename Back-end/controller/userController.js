const User = require('../models/userSchema');
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
const Product = require('../models/productSchema')
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User is already exists' });
        }

        const newUser = new User({
            name,
            email,
            password,  
        });

        await newUser.save();
      
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.status(201).json({ msg: 'User registered successfully' ,token,user:{name:newUser.name,email:newUser.email}});
    } catch (error) {
        console.log('Signup error', error);
        res.status(500).json({ msg: 'Server error' });
    }
};

const userLogin = async (req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        if(user.password !== password){
            return res.status(400).json({msg:'password is not match'})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})

       res.status(201).json({ msg: 'User Logged successfully' ,token,user:{name:user.name,email:user.email}});
    } catch (error) {
        console.log('user login error',error)
        res.status(500).json({msg:'server error'});
    }
}

const addProducts = async (req, res) => {
  try {
    const { title, price, category, condition, description, location } = req.body;
    // const productImage = req.file ? req.file.path.replace(/\\/g, '/') : null;
    const userId = req.userId;
        console.log('product data recived',req.body)
        // console.log('image file data',productImage)
        console.log('user id',userId)
    const newProduct = new Product( {
      title,
      price,
      category,
      condition,
      description,
      location,
      productImage:req.file.filename,
      userId
    })

    const product = await newProduct.save()

    res.status(201).json({ msg: 'Product added successfully', product });
  } catch (error) {
    console.error('Product adding error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const getProducts = async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(201).json(products)
    } catch (error) {
        console.log('products fetching error',error)
        res.status(500).json({msg:'server error'})
    }
}
const productDetails = async(req,res)=>{
    try {
        const products = await Product.findById(req.params.id)
        console.log('products',products)
        res.status(201).json(products)
    } catch (error) {
        console.log('product details page data not found',error)
        res.status(500).json({msg:'server error'})
    }
}
module.exports = {
    signupUser,
    userLogin,
    addProducts,
    getProducts,
    productDetails
};
