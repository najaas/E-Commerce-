// const { render } = require("ejs")
const bannerdata=require('../model/banner')
const {Product}=require('../model/datastore')
const categorymodel=require('../model/category')
const wishlist=require('../model/wishlist')
const cartmodel=require('../model/cart')
const Userdetails=require('../model/userdetails')
const Profile=require('../model/userprofile')
// const {user}=require('../model/datastore')

module.exports={
    userget:async(req,res)=>{
        if (req.query.id){
const search = req.query.id
if(search=="Toys"){
    const data=await bannerdata.find()
    const product=await Product.find({category:"Toys"})
    category= await categorymodel.find()
 return  res.render('user/userhome',{data,product}) 


}else if(search=="Food") {
    const data=await bannerdata.find()
    const product=await Product.find({category:"Food"})
    category= await categorymodel.find()
 return  res.render('user/userhome',{data,product}) 


}else if (search=="Grooming"){

    const data=await bannerdata.find()
    const product=await Product.find({category:"Grooming"})
    category= await categorymodel.find()
 return  res.render('user/userhome',{data,product}) 



}else{
    const data=await bannerdata.find()
    const product=await Product.find({category:"OutDoor Accesseries"})
    category= await categorymodel.find()
 return  res.render('user/userhome',{data,product}) 

}
        }else{
        const data=await bannerdata.find()
        const product=await Product.find()
        category= await categorymodel.find()
     return  res.render('user/userhome',{data,product}) 
        }
    },
    userpost:(req,res)=>{
        res.render('userhome')
    },
    productdetailsget:async(req,res)=>{
        const  productid = req.params.id;
        const product=await Product.findById(productid)
        let wishlist1
if(req.session.email){
console.log(req.session)
    const userID =req.session.userid
    console.log(userID)
        wishlist1 = await wishlist.findOne({userid:userID})
        // console.log(product);

}
        res.render('user/productdetails',{product, wish: wishlist1? wishlist1:null})
    },
    productdetailspost:(req,res)=>{
        const details=req.query.id;
        console.log(details);
        // res.redirect('/user/productdetails')
    },
    profileget:async(req,res)=>{ 
        const userid=req.session.userid
        if(req.session.email){
            const User=await Userdetails.findOne({email:req.session.email})
            const modifydetails=await Profile.findOne({Useremail:req.session.email})
            console.log(modifydetails);
           res.render('user/profile',{User,modifydetails : modifydetails || ''})
            }else{
                res.redirect('/')
            }
    },
    profilepost:async(req,res)=>{
        // const profile=await 
        res.redirect('/profile')
    },
    checkoutget: async (req, res) => {
        try {
            if(req.session.email){
                const cart = await cartmodel.findOne({ userid: req.session.userid }).populate('products.productId');
                const userprofile= await Profile.findOne({Useremail:req.session.email})
                res.render('user/checkout', { cart,userprofile});
            }else{
                res.redirect('/')
            }
        } catch (error) {
            console.error("Error in checkout process: ", error);
            res.status(500).send("Error processing checkout.");
        }
    },
    checkoutpost:async(req,res)=>{
        console.log("heyh");
        if(req.session.email){
            userId=req.session.userid;
            const {username,userlastname,address,city,country,postcode,mobile,useremail}=req.body;
            console.log(req.body);
            const finduser=await Profile.findOne({userid:userId})
           const orderadaress={
            Username:username,
            Userlastname:userlastname,
            Address:address,
            City:city,
            Country:country,
            Postcode:postcode,
            Mobile:mobile,
            Useremail:useremail,
            userid:userId
           }
           const userprofile= await Profile.findByIdAndUpdate(finduser._id,orderadaress)

           return res.redirect('/homedelivery')
        }
        res.redirect('/')
    },
    search : async (req, res) => {
        try {
          const nameQuery = req.body.search?.toString().trim();
          console.log('Search Query:', nameQuery)
          const allProducts = await Product.find({
            name: { $regex: new RegExp(nameQuery, "i") }
          });
      
          console.log('Found Products:', allProducts);
          return res.render('user/searchPage', { product: allProducts });
        } catch (error) {
          console.error('Search Error:', error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
    },
    userdetailsget:async(req,res)=>{
        if(req.session.email){
            const details= await Userdetails.findOne({email:req.session.email})
            res.render('user/userdetails',{details})


        }else{
            res.redirect("/")
        }
    },
    userdetailspost:async(req,res)=>{
        userId=req.session.userid;
        const {username,userlastname,address,city,country,postcode,mobile,useremail}=req.body;
        const userdetails= await Userdetails.findOneAndUpdate(  { email: req.session.email },  
        { $set: { name: username } } )
        const finduser=await Profile.findOne({userid:userId})
        if(finduser){
            const Userprofile={
                Username:username,
                Userlastname:userlastname,
                Address:address,
                City:city,
                Country:country,
                Postcode:postcode,
                Mobile:mobile,
                Useremail:useremail,
                userid:userId
            }
            const userprofile= await Profile.findByIdAndUpdate(finduser._id,Userprofile)
        }else{

        const Userprofile={
            Username:username,
            Userlastname:userlastname,
            Address:address,
            City:city,
            Country:country,
            Postcode:postcode,
            Mobile:mobile,
            Useremail:useremail,
            userid:userId
        }
        const userprofile= await Profile.create(Userprofile)
        userprofile.save()
    }
    res.redirect('/profile')
    },
    homedeliveryget:(req,res)=>{
        if(req.session.email){
            res.render('user/homedelivery')
        }else{
            res.redirect('/')
        }
    }

}