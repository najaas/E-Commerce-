const mongoose= require('mongoose')

const categoryschema=new mongoose.Schema({
    category:{
        type:String
    },
    subcategory:{
        type:Array
    }
})

module.exports=mongoose.model('category',categoryschema)