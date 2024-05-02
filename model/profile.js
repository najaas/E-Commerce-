const mongoose=require('mongoose')
const { stringify } = require('querystring')

const profile= new mongoose.Schema({
    username:{
        type:String
    },
    userlastname:{
        type:String
    },
    dob:{
        type:String
    },
    gender:{
        type:String
    },
    mobile:{
        type:String
    }
})

module.exports=mongoose.model('profile',profile)