const mongoose=require('mongoose');

const  userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    number:{
        type:String
    },
    password:{
        type:String
    },
    confirmpassword:{
        type: String
    },
    sex:{
        type:String
    },
    dob:{
        type:String
    },
    userid:{
        type:String
    }
})

module.exports = mongoose.model('userlist', userSchema);