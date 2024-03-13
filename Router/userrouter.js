const express=require('express')
const router=express.Router()
 
const user=require('../controller/usercontroller')

router.get('/home',user.userget)
router.post('/',user.userpost)

module.exports=router;
