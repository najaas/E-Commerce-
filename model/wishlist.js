const mongoose=require('mongoose')

const wishlistschema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'userlist',
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    
      }]
})

module.exports=mongoose.model('wishlist',wishlistschema)