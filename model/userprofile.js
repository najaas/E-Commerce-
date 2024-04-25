const mongoose=require('mongoose')

const profilSchema= new mongoose.Schema({
    Username:{
        type:String
    },
    Userlastname:{
        type:String
    },
    Address:{
        type:String
    },
    City:{
        type:String
    },
    Country:{
        type:String
    },
    Postcode:{
        type:String
    },
    Mobile:{
        type:String
    },
    Useremail:{
        type:String
    },
    userid: {
        type: String,
        required: true
    },
})

module.exports=mongoose.model('UserProfile', profilSchema )