const session = require("express-session");
const Cart = require("../model/cart");
const { Product } = require("../model/datastore");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

module.exports = {
  Addcartget:  async (req, res) => {
    if (req.session.email){
      const userId = req.session.userid;
      const productId = new mongoose.Types.ObjectId(req.params.id);
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      let cart = await Cart.findOne({ userid: userId });
      if (!cart) {
        console.log("No cart found, creating one...");
        cart = new Cart({
          userid: userId,
          products: [{ productId: productId, quantity: 1 }],
          total: product.prizePercenttage
        });
      } else {
        const productIndex = cart.products.findIndex(item => item.productId.equals(productId));
        if (productIndex > -1) {
          cart.products[productIndex].quantity += 1;
        } else {
          cart.products.push({ productId: productId, quantity: 1 });
        }
        cart.total += product.prizePercenttage ;
      }
    
      await cart.save();
      console.log("Updated Cart:", cart);
    
      res.send("Product added to cart successfully");
    }else{
    res.redirect("/");
    }
  },
  cartget: async (req, res) => {
    if (req.session.email) {
      const userId = req.session.userid;

      const carts = await Cart.findOne({ userid: userId }).populate({
        path: "products.productId",
        model: "products",
      });
     
        // var subtotal = 0;
        // // var Total=0;
        // carts.products.forEach(cart => {
        //     if (cart.productId && cart.productId.price) {
        //         subtotal += cart.productId.prizePercenttage;
        //     }
        // });

        return res.render("user/cart", {
          carts: carts ? carts : null,
        });
      
    } else {
      res.redirect("/");
    }
  },

  cartdelete: async (req, res) => {
    try {
        const userId = req.session.userid;
        const productId = req.query.id;

        const productDetails = await Product.findById(productId);
        if (!productDetails) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        let updatedCart = await Cart.findOneAndUpdate(
            { userid: userId },
            { $pull: { products: { productId: productId } } },
            { new: true }
        );
console.log(updatedCart)
        if (!updatedCart) {
            return res.status(404).json({ success: false, message: "Cart not found, or product not in cart" });
        }

        let newTotal = 0;
        if (updatedCart.products.length > 0) {
            for (let item of updatedCart.products) {
                let itemDetails = await Product.findById(item.productId);
                if (itemDetails) {
                    newTotal += itemDetails.prizePercenttage * item.quantity;
                }
            }
        }

        updatedCart = await Cart.findOneAndUpdate(
            { userid: userId },
            { $set: { total: newTotal } },
            { new: true }
        );

       
        res.json({ success: true, cart: updatedCart });
    } catch (error) {
        console.error("Error in removing product from cart:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
},
  updatecartpost: async (req, res) => {
    let userId = req.session.userid;
    let cartId = req.body.cartId;
    let quantity = req.body.quantity;
    console.log(quantity);

    try {
      const cartdata = await Cart.findOneAndUpdate(
        { userid: userId, "products._id": cartId },
        { $inc: { "products.$.quantity": quantity } }
      );
      const cart = await Cart.findOne({ userid: userId }).populate({
        path: "products.productId",
        model: "products",
      });

      const subtotal = cart.products.reduce((acc, value) => {
        return (acc += value.productId.prizePercenttage * value.quantity);
      }, 0);
      await Cart.updateOne(
        { userId: req.session._id },
        { $set: { total: subtotal + 50 } }
      );
      res.status(200).json({ subtotal });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  },
};
