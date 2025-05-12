const mongoose = require('mongoose')
const userSchema = require('./userSchema')
const {Schema} = mongoose

const productSchema = new Schema ({
    title:{
        type:String
    },
    price:{
        type:Number
    },
    category:{
        type:String
    },
    condition:{
      type:String  
    },
    description:{
        type:String
    },
    location:{
        type:String
    },
     productImage: {
        type: [String],
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{ timestamps: true })

module.exports = mongoose.model('Products',productSchema)