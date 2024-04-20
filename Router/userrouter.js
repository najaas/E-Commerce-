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
.delete('/wishlist/delete/:id',wishlist.wishlistdelete)

module.exports=router;
