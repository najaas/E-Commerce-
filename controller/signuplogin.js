const {user} = require('../model/datastore')
const passwordregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const phoneregex=/^\d{10}$/
const nodemailer=require('nodemailer')
const otpsender=require('../utility/otp')
const otpcode =Math.floor(Math.random()*9000)+1000; 
require("dotenv").config();
// const flash=require('connect-flash');
const flash=require('connect-flash')
let err=''
const bannerdata=require('../model/banner')


module.exports={
    loginget:(req,res)=>{
       if( req.session.email){
        res.render('index')
       }else{
         res.render('entry/login')
       }
        },
    loginpost:async(req,res)=>{
        const Email=req.body.email
        const  Password=req.body.password
        console.log(Email);
        const data= await user.findOne({email:Email,password:Password})
        
       if(data){
        res.render('admin/home')
       }else{
        res.render('entry/login')
       }
    },
    signupget:(req,res)=>{
        if(req.session.email){
            res.render('userhome')
        }else{
            res.render('Entry/signup')

        }
    },
    signuppost:async(req,res)=>{
        if( ! passwordregex.test(req.body.password) || ! emailregex.test(req.body.email) || ! phoneregex.test(req.body.phone)){
            res.send('correct fill in the page') 
        }else{
        const {
            name,
            email,
            phone,
            password
        }=req.body;

        const data= {
            name :name,
            email:email,
            phone:phone, 
            password:password
        } 
        const newuser=await user.create(data)
        newuser.save()

        console.log(newuser);
        if(email){
            req.session.email = email ;
        }
        console.log(req.session.email)
       res.redirect("/email")

    }
},

    otpget:(req,res)=>{
        const email=req.session.email;
        otpsender(email,otpcode)
        res.render('Entry/email')  
  },
    otppost:(req,res)=>{
        const {otp}=req.body;
        const otpp = otp.join('');
const otp1 = parseInt(otpp);

        console.log(otpcode);

        if (otp1===otpcode){
            console.log('Email set');
        res.render('Entry/login')
               }else{
                res.redirect('/email')
               }
                    
    },
    forgotget:(req,res)=>{
        res.render('Entry/forgot')
    },
    forgotpost:async(req,res)=>{
        const {email}=req.body;
        req.session.email=email
        const forgot= await user.findOne({email:email})
        otpsender(email,otpcode)
        if(forgot){
            res.render('Entry/forgototp')
        }else{
            res.render('Entry/forgot')
        }
    },
    forgototpget:(req,res)=>{
        res.render('Entry/forgototp')
    },
    forgototppost:(req,res)=>{
        const {otp}=req.body;
     
        if (otp==otpcode){
            console.log('Email set');
        res.render('Entry/newpassword')
               }else{
                console.log('Invalid OTP');
                res.render('Entry/forgototp')
               }

    },
    newpasswordget:(req,res)=>{
        res.render('entry/newpassword')
    },
    newpasswordpost:async(req,res)=>{
        const {password,confirmpassword}=req.body;
        const email=req.session.email;
       
        if(password!=confirmpassword){
            console.log('Not A same');
            res.redirect('/newpassword')
        }
        else if( !passwordregex.test(req.body.password)|| !passwordregex.test(req.body.confirmpassword)){
            console.log('strong password');
            err='Password should be strong'
                
                 res.redirect('/newpassword')
        }else{
            await user.updateOne({email:email},{$set:{password:password}});
        res.render('entry/login')
    }
    },
    userloginget:(req,res)=>{
        res.render('Entry/userlogin')
    },
    userloginpost:async(req,res)=>{
      res.redirect('/userhome')
    },
    usersignupget:(req,res)=>{
        res.render('Entry/usersignup')
    },
    usersignuppost:(req,res)=>{
        res.redirect('/userlogin')
    }
}
