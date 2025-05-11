const User = require('../models/userSchema');
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
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

module.exports = {
    signupUser
};
