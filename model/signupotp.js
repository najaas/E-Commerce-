const mongoose = require('mongoose')

const signupotpschema = mongoose.Schema(
    {
        otp:String,
        createAt:{
            type:Date,
            default:Date.now()
        }
    }
)
signupotpschema.index({createAt:1},{expireAfterSeconds:50})

module.exports=mongoose.model("SignUpOtp",signupotpschema);
