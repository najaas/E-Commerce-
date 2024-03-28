const category = require('../model/category')

module.exports={
    categoryget:async(req,res)=>{
        const categories=await category.find() 
        res.render('admin/category',{categories})
    },
    categorypost:async(req,res)=>{
        const {categoryname,subcategoryname}=req.body
        // console.log(req.body);

        const categoryy=await category.findOne({categoryy:categoryname})

        if(!categoryy){
            category.create({
                category:categoryname,
                subcategory:[subcategoryname]
            });
        }else{
            categoryy.subcategory.push(subcategoryname)
            await categoryy.save()
        }
        res.redirect('/admin/category')
    },
        categoryDELETE:async(req,res)=>{
            try{
                const id=req.query.id;
              await category.deleteOne({_id:id})
                res.status(200).json({success:true,message:"category removed list"})
      
            }catch(error){
              console.log("error in removing category",error);
              res.status(500).json({success:false,message:"something wrong"})
            }
          }

    
    
}