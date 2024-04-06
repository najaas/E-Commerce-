const session = require("express-session");
const Cart = require("../model/cart");
const { Product } = require("../model/datastore");
const { findOneAndUpdate } = require("../model/banner");
const { ObjectId } = require('mongodb');
const { render } = require("ejs");
const cart = require("../model/cart");

module.exports = {
  cartget: async (req, res) => {
    const productId = req.params.id;
    const userId =new ObjectId(req.session.userid);
    console.log(userId);
    const existingCart = await Cart.findOne({ userid: userId });

    if (existingCart) {
      const updateCart = await Cart.findOneAndUpdate(
        { userid: userId },
        { $push: { products: { productId: productId } } },
        { new: true }
      );
      console.log(productId, updateCart);
      const cartdata= await Cart.findOne(userId).populate({path:"products.productId",model:'Product'})
      res.status(200).json({success:true})
      res.render('Entry/userlogin')
    } else {
      const newCart = new Cart({
        userid: userId,
        products: [{ productId: productId }],
      });
      await newCart.save();
      console.log(productId, newCart);
      res.status(200).json({success:true})

    }
  },

  cartpost:async(req,res)=>{
    const userId = new ObjectId( req.session.userid)
    const carts= await Cart.findOne({userid:userId}).populate({path:"products.productId",model:'products'})
    console.log(carts);
    res.render('user/cart',{carts}) 
 },
};
