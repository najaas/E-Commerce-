const express=require('express')
const router=express.Router()
const upload=require('../middleware/multer')
const admin=require('../controller/admincontroller')
const category=require('../controller/categorycontroller')
const banner=require('../controller/bannercontroller')

// Admin home

router.get('/admin',admin.adminget)
router.post('/admin',admin.adminpost)

//Product Add

router.get('/addproduct',admin.productget)
router.post('/addproduct',upload.array('image',4), admin.productpost)

//showproduct

router.get('/showproduct',admin.showproductget)
router.post('/showproduct',admin.showproductpost)

// admin product edit


router.get('/editproduct/:productid',admin.editproductget)
router.post('/editproduct/:productid',upload.single('image'),admin.editproductpost)

    // delete product 
router.get('/delete/:productId',admin.deleteget)

// Discount 

// router.get('/userhome/:id',admin.productdiscountget)



//Category

router.get('/category',category.categoryget)
router.post('/category',category.categorypost)

// category delete 

router.delete('/fullcatdelete',category.categoryDELETE)



//Banner

router.get('/banner',banner.bannerget)
router.post('/banner',banner.bannerpost)

// add banner

router.get('/addbanner',banner.addbannerget)
router.post('/addbanner',upload.single('image'),banner.addbannerpost)

// Edit Banner

router.get('/editbanner/:id',banner.editbannerget)
router.post('/editbanner/:id',upload.single('image'),banner.editbannerpost)

// delete banner

router.delete('/deletebanner',banner.deletebanner)

//Add Admin

router.get('/orderlist',admin.orderlistget)
router.post('/orderlist',admin.orderlistpost)

//Dashboard

router.get('/dashboard',admin.dashboardget)
router.post('/dashboard',admin.dashboardpost)


//Userlist

router.get('/userlist',admin.userlistget)
router.post('/userlist',admin.userlistpost)
router.post('/updateorder', admin.updateorderpost)


module.exports=router