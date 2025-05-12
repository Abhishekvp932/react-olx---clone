

const express = require('express')
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const userController = require('../controller/userController')
router.post('/signup',userController.signupUser)
router.post('/login',userController.userLogin)
router.post('/addProducts',upload.single('productImage'), userController.addProducts);
router.get('/products',userController.getProducts)
router.get('/product/:id',userController.productDetails)
module.exports = router