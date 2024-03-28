const mongoose=require('mongoose')

const bannerschema=new mongoose.Schema({

    Title:{
        type:String,
        // required:true
    },
    Expirydate:{
        type:Date,
        // required:true
    },
    Description:{
        type:String,
        // required:true
    },
    Image:{
        type:String
    }
})

module.exports = mongoose.model('Banner',bannerschema)