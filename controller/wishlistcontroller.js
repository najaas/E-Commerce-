const Wishlist = require("../model/wishlist");
const User = require("../model/userdetails");
const {Product}=require('../model/datastore')
const session = require("express-session");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

module.exports = {
  wishlistget: async (req, res) => {
    try {
      if (req.session.email) {
        const userId = req.session.userid;
        const wishlist = await Wishlist.findOne({ userid: userId }).populate(
          "products"
       );
        if (wishlist) {
          res.render("user/wishlist", { data:wishlist?wishlist.products:"" });
        } else {
          // Handle case where wishlist is empty or not found
          res.render("user/wishlist", { data: [] });
        }
      } else {
        res.redirect("/userlogin");
      }
    } catch (error) {
      console.error(error);
      // Handle error
      res.status(500).send("Internal Server Error");
    }
  },
  Addwishlistpost: async (req, res) => {
    console.log("hai najas kutta");
    if (req.session.email) {
      const productId = new mongoose.Types.ObjectId(req.params.id);
      console.log(productId);
      const userId = new mongoose.Types.ObjectId(req.session.userid);
      console.log(userId);
      const wishlist = await Wishlist.findOne({ userid: userId });
      console.log("hai rameeskutta", wishlist);
      if (!wishlist) {
        const newdata = new Wishlist({
          userid: userId,
          products: [productId],
        }); 
        await newdata.save();
      } else {
console.log(wishlist.products,"koooo")
console.log(productId,"vaaaa");

const wishlistcheck = wishlist.products.some(product => product.equals(productId));   

if(wishlistcheck){
  console.log(wishlist)
  await Wishlist.updateOne({ _id: wishlist._id }, { $pull: { products: productId } });
    return res.status(200).json({ message: "Product removed from wishlist" });

}else{
  wishlist.products.push(productId);
  await wishlist.save();
  return res.status(200).json({ message: "added to wishlist" })
}
      }} else {
        res.status(400).json("message:false");
        res.redirect('/userlogin')

      }
   
  },
  wishlistdelete: async (req, res) => {
    try {
      console.log('booy');
      const productId = req.query.id
      console.log(productId);
      const userId =req.session.userid

      const wishlist = await Wishlist.findOne({ userid: userId });
      console.log("hai rameeskutta", wishlist);

      const productObjectId = new mongoose.Types.ObjectId(productId);

      // Use updateOne with $pull to remove the product from the wishlist
      const updateResult = await Wishlist.updateOne(
        { _id: wishlist._id },
        { $pull: { products: productObjectId } }
      );
  


      res.send(true);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
