
const mongoose=require('mongoose')


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
        type:Array,
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
    category:{
        type:String
    },
    description:{
        type:String,
        // required:true
    },
    DiscountPercentage:{
        type:Number,
        // required:true
    },
    prizePercenttage:{
        type:Number
    }
})



module.exports={
    user:mongoose.model('Admindatastore',Signup),
    Product:mongoose.model('products',productschema)

}