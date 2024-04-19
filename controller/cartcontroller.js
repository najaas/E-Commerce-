const session = require("express-session");
const Cart = require("../model/cart");
const { Product } = require("../model/datastore");
const { ObjectId } = require('mongodb');

module.exports = {
  Addcartget: async (req, res) => { 
    const productId = req.params.id;
    const userId =new ObjectId(req.session.userid);
    const existingCart = await Cart.findOne({ userid: userId });

    if (existingCart) {
      const updateCart = await Cart.findOneAndUpdate(
        { userid: userId },
        { $push: { products: { productId: productId } } },
        { new: true }
      );
      const cartdata= await Cart.findOne(userId).populate({path:"products.productId",model:'products'})
      res.status(200).json({success:true})
    } else {
      const newCart = new Cart({
        userid: userId,
        products: [{ productId: productId }],
      });
      await newCart.save();
      res.status(200).json({success:true})

    }
  },

  cartget:async(req,res)=>{
    const userId = new ObjectId( req.session.userid)
    const carts= await Cart.findOne({userid:userId}).populate({path:"products.productId",model:'products'})
    if(carts) {

      var subtotal = 0;
      var Total=0;
      carts.products.forEach(cart => {
          if (cart.productId && cart.productId.price) {
              subtotal += cart.productId.prizePercenttage;
            
              
          }
      });
    }
    res.render('user/cart',{carts,subtotal}) 
 },
 cartdelete:async(req,res)=>{
  try{
  const id=req.session.userid;
  const proid=req.query.id;
const cart = await Cart.findOneAndUpdate(
  {userid:id},
  {$pull:{products:{productId:proid}}}
)
}catch(error){
    console.log("error in removing category",error);
    res.status(500).json({success:false,message:"something wrong"})
  }
 },
 updatecartpost:async(req,res)=>{
  userId=req.session.userid;
  cartId=new ObjectId (req.body.cartId);
  quantity=(req.body.quantity)
  console.log(quantity);

try {

    const cartdata = await Cart.findOneAndUpdate(
        { userid: userId, 'products._id': cartId },
        { $inc: { 'products.$.quantity':quantity } },
    );

     const cart = await Cart.findOne({userid:userId}).populate({path:"products.productId",model:'products'});

      const subtotal = cart.products.reduce((acc, value) => {
        return (acc += value.productId.prizePercenttage * value.quantity);
      }, 0);
      await Cart.updateOne(
        { userId: req.session._id },
        { $set: { total: subtotal + 50}}
        );        
      res.status(200).json({subtotal});
} catch (error) {
    console.error("Error occurred:", error);
}
 }
};

