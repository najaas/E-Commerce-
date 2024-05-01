// const { render } = require("ejs")
const bannerdata=require('../model/banner')
const {Product}=require('../model/datastore')
const categorymodel=require('../model/category')
const wishlist=require('../model/wishlist')
const cartmodel=require('../model/cart')
const Userdetails=require('../model/userdetails')
const useraddress=require('../model/Address')
const Order = require("../model/order")
// const Rezorepay=require('razorpay')
const Razorpay = require('razorpay')

const rezorepay=new Razorpay({
key_id:process.env.keyid,
key_secret:process.env.keysecret
})
const {user}=require('../model/datastore')

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
            const modifydetails=await useraddress.findOne({Useremail:req.session.email})
           res.render('user/profile',{User,modifydetails : modifydetails || ''})
            }else{
                res.redirect('/')
            }
    },
    profilepost:async(req,res)=>{
        res.redirect('/profile')
    },
    checkoutget: async (req, res) => {
        try {
            if(req.session.email){
                const cart = await cartmodel.findOne({ userid: req.session.userid }).populate('products.productId');
                const userprofile= await useraddress.find()
                res.render('user/checkout', { cart,userprofile});
            }else{
                res.redirect('/')
            }
        } catch (error) {
            res.status(500).send("Error processing checkout.");
        }
    },
    checkoutpost:async(req,res)=>{
        if(req.session.email){
            // console.log(req.body)
           const userId=req.session.userid;
            const {payment,address,username,userlastname,postcode,mobile,city,country,}=req.body;
            console.log(address);
            // console.log(username);
            // console.log(select);
            const finduser=await useraddress.findOne({userid:userId})
     
        //    const userdetails=await Order.
        //  req.session.userorder =orderaddress
        const userid  = finduser.userid
const cart = await cartmodel.findOne({ userid: req.session.userid }).populate('products.productId');
        if (payment!="Paypal"){

let totalarray =[]
cart.products.forEach((ele)=>{
totalarray.push({productID:ele.productId._id,quantity:ele.quantity})
})

const order = new Order({
    customerId: userid,
    items: totalarray,
    totalAmount: cart.total,
    Address:address,
    Userlastname:userlastname,
    Postcode:postcode,
    Mobile:mobile,
    City:city,
    Country:country,
    Username:username,
    status: 'pending'  // Default status
});

await order.save()
cart.products=[]
cart.total=0
cart.save()
return res.status(200).json({cod:true})
        }else{
            let totalarray =[]
            cart.products.forEach((ele)=>{
            totalarray.push({productID:ele.productId._id,quantity:ele.quantity})
            })
            

            const order = new Order({
                customerId: userid,
                items: totalarray,
                totalAmount: cart.total,
                Address:address,
                Userlastname:userlastname,
                Postcode:postcode,
                Mobile:mobile,
                City:city,
                Country:country,
                Username:username,
                status: 'pending'  // Default status
            });

            
return res.status(200).json({cod:false, order})


        }



        }else{
            res.redirect('/')
        }
    },
    search : async (req, res) => {
        try {
          const nameQuery = req.body.search?.toString().trim();
          const allProducts = await Product.find({
            name: { $regex: new RegExp(nameQuery, "i") }
          });
      
          return res.render('user/searchPage', { product: allProducts });
        } catch (error) {
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
        // const userdetails= await Userdetails.findOneAndUpdate(  { email: req.session.email },  
        // { $set: { name: username } } )
        // const finduser=await useraddress.findOne({userid:userId})
        // if(finduser){
        //     const Userprofile={
        //         Username:username,
        //         Userlastname:userlastname,
        //         Address:address,
        //         City:city,
        //         Country:country,
        //         Postcode:postcode,
        //         Mobile:mobile,
        //         Useremail:useremail,
        //         userid:userId
        //     }
        //     const userprofile= await useraddress.findByIdAndUpdate(finduser._id,Userprofile)
        // }else{
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
        const userprofile= await useraddress.create(Userprofile)
        userprofile.save()
    // }.

    res.redirect('/profile')
    },
    homedeliveryget:(req,res)=>{
        if(req.session.email){
            res.render('user/homedelivery')
        }else{
            res.redirect('/')
        }
    },
    orderlistget: async (req, res) => {
        try {
            const orderlist = await Order.find().populate({ path: 'items.productID' });
    
            res.render('user/orderlist', { orderlist });
        } catch (error) {
            console.error("Failed to retrieve orders:", error);
    
            res.status(500).send("Error fetching order details.");
        }
    },
    orderstatusget : async (req, res) => {
        try {
            const productId = req.params.id;
            console.log(productId);
    
            const orderstatus = await Order.findById(productId)
                // .populate({ path: 'Address', model: 'useraddress' })  // Assuming 'UserAddress' is the model name
                .populate({ path: 'items.productID', model:"products" }); // Assuming 'Product' is the model name
    
            console.log(orderstatus);
            res.render('user/orderstatus', { orderstatus });
        } catch (error) {
            console.error('Error fetching order status:', error);
            res.status(500).send('An error occurred while retrieving order status');
        }
    },
    profiledetailsget:(req,res)=>{
        res.render('user/profiledetails')
    },
    profiledetailspost:(req,res)=>{
        console.log('heiiii');
        res.redirect('/profile')
    }
}