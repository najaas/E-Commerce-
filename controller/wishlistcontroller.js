const Wishlist = require('../model/wishlist');
const User = require('../model/userdetails');
const session = require('express-session');
const { ObjectId } = require('mongodb');
const { default: mongoose } = require('mongoose');

module.exports = {
    wishlistget: async (req, res) => {
        try {
            console.log('hey');
            console.log(req.session.email);
            if (req.session.email) {
                const userId = req.session.userid;
                console.log(userId);
                const wishlist = await Wishlist.findOne({ userid: userId }).populate({ path: "products.productId", model: 'products' });
                console.log(wishlist, "hellooo");
                if (wishlist) {
                    res.render('user/wishlist', { data: wishlist.products });
                } else {
                    // Handle case where wishlist is empty or not found
                    res.render('user/wishlist', { data: [] });
                }
            } else {
                res.redirect('/userlogin');
            }
        } catch (error) {
            console.error(error);
            // Handle error
            res.status(500).send('Internal Server Error');
        }
    },
    Addwishlistpost: async (req, res) => {
        if(req.session.email){
            const productId =new mongoose.Types. ObjectId (req.params.id);
            console.log(productId);
            const userId =new mongoose.Types. ObjectId (req.session.userid);
            console.log(userId);
            if(productId){
                return res.status(400).json({error: 'Product ID is required'});
            }
            const wishlist= await Wishlist.findOne({userid:userId});
            if(!wishlist){
                const newdata= new Wishlist({
                    userid:userId,
                    products:[{productId}]
                });
                await newdata.save();
        }else{
            if (!wishlist.products.includes(productId)){
                await wishlist.updateOne(
                    {userid:_id},
                    {$push:{products:productId}}
                );
            }
            res.status(200).json({message:'added to wishlist'})
        }
        }else{
            res.status(202).json('message:false')
        }
    },
    wishlistdelete: async (req, res) => {
        try {
            // Implement wishlist item deletion functionality
            // Retrieve wishlist item ID from request parameters and delete from wishlist
            res.send('Delete from wishlist functionality will be implemented here');
        } catch (error) {
            console.error(error);
            // Handle error
            res.status(500).send('Internal Server Error');
        }
    }
};
