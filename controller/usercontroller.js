// const { render } = require("ejs")
const bannerdata=require('../model/banner')
const {Product}=require('../model/datastore')
const categorymodel=require('../model/category')
const wishlist=require('../model/wishlist')

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



// }else if (search=="outdoor") {

//     const data=await bannerdata.find()
//     const product=await Product.find({category:"OutDoor Accesseries"})
//     category= await categorymodel.find()
//  return  res.render('user/userhome',{data,product}) 


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
    }
}