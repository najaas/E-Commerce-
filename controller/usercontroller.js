// const { render } = require("ejs")
const bannerdata=require('../model/banner')
const {Product}=require('../model/datastore')
const categorymodel=require('../model/category')

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
    }
}