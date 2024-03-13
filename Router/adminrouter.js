const express=require('express')
const router=express.Router()
const upload=require('../middleware/multer')
const admin=require('../controller/admincontroller')

// Admin home

router.get('/admin',admin.adminget)
router.post('/admin',admin.adminpost)

//Product Add

router.get('/addproduct',admin.productget)
router.post('/addproduct',upload.single('image'), admin.productpost)

//Dashboard

router.get('/dashboard',admin.dashboardget)
router.post('/dashboard',admin.dashboardpost)

//showproduct

router.get('/showproduct',admin.showproductget)
router.post('/showproduct',admin.showproductpost)

//Category

router.get('/category',admin.categoryget)
router.post('/category',admin.categorypost)

//Userlist

router.get('/userlist',admin.userlistget)
router.post('/userlist',admin.userlistpost)

//Banner

router.get('/banner',admin.bannerget)
router.post('/banner',admin.bannerpost)

//Add Admin

router.get('/addadmin',admin.addadminget)
router.post('/addadmin',admin.addadminpost)

// edit


router.get('/editproduct/:productid',admin.editproductget)
router.post('/editproduct/:productid',upload.single('image'),admin.editproductpost)

            
router.get('/delete/:productId',admin.deletepost)


module.exports=router