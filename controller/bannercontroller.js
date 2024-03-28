const bannerdata=require('../model/banner')

module.exports={
    bannerget:async(req,res)=>{
        const banner=await bannerdata.find()
        res.render('admin/banner',{banner})
    },
    bannerpost:(req,res)=>{
        res.redirect('/admin/banner')
    },
    addbannerget:(req,res)=>{
        res.render('admin/addbanner')
    },
    addbannerpost:async(req,res)=>{
        const {title,expirydate,description}=req.body
        const image=req.file.filename
        const newdata=new bannerdata({
            Title:title,
            Expirydate:expirydate,
            Description:description,
            Image:image
        })
        await newdata.save();
        res.redirect('/admin/banner')
    },
    editbannerget:async(req,res)=>{
        const id=req.params.id;
      const data=await bannerdata.findById(id)
        res.render('admin/editbanner',{data})
    },
    editbannerpost:async(req,res)=>{
        const id=req.params.id;
    

        const data=await bannerdata.findById(id);

        const {title,expirydate,description}=req.body;
        
        let image= req?.file?.filename
        if(image){
            await bannerdata.updateOne({_id:data},{$set:{Title:title,Expirydate:expirydate,Description:description,Image:image}})
        }else{
            await bannerdata.updateOne({_id:data},{$set:{Title:title,Expirydate:expirydate,Description:description,Image:image}})
        }
        res.redirect('/admin/banner')
    },
    deletebanner:async(req,res)=>{
        try{
            const id=req.query.id;
          await bannerdata.deleteOne({_id:id})
            res.status(200).json({success:true,message:"banner removed list"})
  
        }catch(error){
          console.log("error in removing banner",error);
          re
    }

}
}