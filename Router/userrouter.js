const express=require('express')
const router=express.Router()
 
const user=require('../controller/usercontroller')

router.get('/userhome',user.userget)
router.post('/userhome',user.userpost)

module.exports=router;
