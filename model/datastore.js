// const { truncate } = require('fs/promises');
const mongoose=require('mongoose')

// mongoose.connect("mongodb://localhost:27017/pe-cart")


const Signup=new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        // required:true
    },
    phone:{
        type:Number,
        // required:true
    },
    password:{
        type:String,
        // required: true  
    },
    confirmpassword:{
        type:String,
        // required:true
    },
    role:{
        default:false,
        type:Boolean
    }

})

const productschema=new mongoose.Schema({
    image:{
        type:String,
        // required:true
    },
    name:{
        type:String,
        // required:true
    },
    price:{
        type:Number,
        // required:true
    },
    description:{
        type:String,
        // required:true
    },
    DiscountPercentage:{
        type:String,
        // required:true
    }
})




module.exports={
    user:mongoose.model('Userdatastore',Signup),
    Product:mongoose.model('products',productschema)

}