const mongoose=require('mongoose')
const env = require('dotenv').config()
const connectdatabase=async()=>{

   try{

    const con= await mongoose.connect(process.env.MONGO_URI)
    console.log(`'mongoDb connected':${con.connection.host}`)

   }catch(error){

    console.error(error.message)
    process.exit(1)
   }
}

module.exports=connectdatabase