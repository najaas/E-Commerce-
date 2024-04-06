const express=require('express')
const router=express.Router()
 
const user=require('../controller/usercontroller')
const cart=require('../controller/cartcontroller')

    // user home

router.get('/userhome',user.userget)
router.post('/userhome',user.userpost)

// cart

router.get('/cart/:id',cart.cartget)
router.get('/cart',cart.cartpost)

// product details

router.get('/productdetails/:id',user.productdetailsget)
router.post('/productdetails',user.productdetailspost)

module.exports=router;
