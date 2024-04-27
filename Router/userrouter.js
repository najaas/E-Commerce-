const express=require('express')
const router=express.Router()
 
const user=require('../controller/usercontroller')
const cart=require('../controller/cartcontroller')
const wishlist=require('../controller/wishlistcontroller')

    // user home

router.get('/userhome',user.userget)
router.post('/userhome',user.userpost)

// cart

router.get('/cart/:id',cart.Addcartget)
router.get('/cart',cart.cartget)

// cart update

// router.get('/updatecart/:id',cart.updatecartget)
router.post('/updatecart',cart.updatecartpost)

// cart Delete

router.delete('/delete',cart.cartdelete)


// product details

router.get('/productdetails/:id',user.productdetailsget)
router.post('/productdetails',user.productdetailspost)

//Wishlist

router.get('/wishlist',wishlist.wishlistget)
router.post('/addwishlist/:id',wishlist.Addwishlistpost)
router.delete('/wishlist/delete',wishlist.wishlistdelete)

//user profile

router.get('/profile',user.profileget)
router.post('/profile',user.profilepost)

//checkout
 
router.get('/checkout',user.checkoutget)
router.post('/checkout',user.checkoutpost)

// Search
router.post('/search',user.search)

// User profile Details
router.get('/userdetails',user.userdetailsget)
router.post('/userdetails',user.userdetailspost)

//Orderplaced Homedelivery
router.get('/homedelivery',user.homedeliveryget)

module.exports=router;
