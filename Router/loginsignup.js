const express=require('express')
const router=express.Router()
// const controller=require("../controller/signuplogin")

const {

    loginget,

    loginpost,

    signupget,

    signuppost,

    otpget,

    otppost,

    forgotget,
    
    forgotpost,

    forgototpget,

    forgototppost,

    newpasswordget,

    newpasswordpost

}=require('../controller/signuplogin')

//Login Page

router.get('/login',loginget)
router.post('/login',loginpost)
            
//Signup Page

router.get('/signup',signupget)
router.post('/signup',signuppost)

//Email/Otp Page

router.get('/email',otpget)
router.post('/email',otppost)

//forgot password

router.get('/forgot',forgotget)
router.post('/forgot',forgotpost)

// forgot otp

router.get('/forgototp',forgototpget)
router.post('/forgototp',forgototppost)

// new password add

router.get('/newpassword',newpasswordget)
router.post('/newpassword',newpasswordpost)


const user=require('../controller/signuplogin')

// user login

router.get('/userlogin',user.userloginget)
router.post('/userlogin',user.userloginpost)

// user signup

router.get('/usersignup',user.usersignupget)
router.post('/usersignup',user.usersignuppost)

// user Otp

router.get('/userotp',user.userotpget)
router.post('/userotp',user.userotppost)


module.exports=router;
