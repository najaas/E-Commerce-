const session = require("express-session");
const Cart = require("../model/cart");
const { Product } = require("../model/datastore");
const { ObjectId } = require('mongodb');

module.exports = {
  cartget: async (req, res) => { 
    const productId = req.params.id;
    const userId =new ObjectId(req.session.userid);
    // console.log(userId);
    const existingCart = await Cart.findOne({ userid: userId });

    if (existingCart) {
      const updateCart = await Cart.findOneAndUpdate(
        { userid: userId },
        { $push: { products: { productId: productId } } },
        { new: true }
      );
      // console.log(productId, updateCart);
      const cartdata= await Cart.findOne(userId).populate({path:"products.productId",model:'products'})
      res.status(200).json({success:true})
      res.render('Entry/userlogin')
    } else {
      const newCart = new Cart({
        userid: userId,
        products: [{ productId: productId }],
      });
      await newCart.save();
      // console.log(productId, newCart);
      res.status(200).json({success:true})

    }
  },

  cartpost:async(req,res)=>{
    const userId = new ObjectId( req.session.userid)
    const carts= await Cart.findOne({userid:userId}).populate({path:"products.productId",model:'products'})
    console.log(carts);
    if(carts) {

      // Initialize subtotal
      var subtotal = 0;
      var Total=0;

      // Iterate over each product in the cart
      carts.products.forEach(cart => {
          // Check if the product and its price exist
          if (cart.productId && cart.productId.price) {
              // Add the price of the product to the subtotal
              subtotal += cart.productId.prizePercenttage;
              Total=subtotal+50;
              
          }
      });
    }
    console.log(Total);
    // console.log(carts);
    res.render('user/cart',{carts,subtotal,Total}) 
 },
 cartdelete:async(req,res)=>{
  try{
  const id=req.session.userid;
  const proid=req.query.id;
  // console.log('helloooooooo',id,proid);
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
  console.log("hellooooo",userId);
  quantity=req.body.cartId;
  console.log("hely",quantity);
    
 }
};
