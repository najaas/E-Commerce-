const {Product}=require('../model/datastore')


module.exports={
    adminget:(req,res)=>{
        res.render('admin/home')
    },
    adminpost:(req,res)=>{
        res.redirect('admin/addproduct')
    },
    productget:(req,res)=>{
        res.render('admin/addproduct')
    },
    productpost:async(req,res)=>{
        try{const {
            name,
            price,
            description,
            DiscountPercentage
        }=req.body
    console.log('all set',req.body);

    const image =req.file.filename

    const newproduct=new Product({
        name,
        price,
        description,
        DiscountPercentage,
        image
    })
    await newproduct.save()
        res.redirect('/admin/showproduct')
    }
        catch(err){
            console.log(err);
        }
    },
    dashboardget:(req,res)=>{
        res.render('admin/dashboard')
    },
    dashboardpost:(req,res)=>{
        res.render('admin/dashboard')
    },
    showproductget:async(req,res)=>{
        const product=await Product.find()
        res.render('admin/showproduct',{Products:product})
    },
    showproductpost:(req,res)=>{
        res.render('admin/showproduct')
    },
    editproductget:async (req,res)=>{
        const producId = req.params.productid

        const product = await  Product.findById(producId)
        console.log(product)
        res.render('admin/editproduct',{product})
    },
    editproductpost:async(req,res)=>{
        try{
      const productid=req.params.productid;
    //   console.log(`params id ${productid}`
        const {name,price,description,DiscountPercentage}=req.body;

        const image = req.file.filename
        console.log(image);

        // console.log(image,name,price,description,DiscountPercentage);
        const product1=await Product.findById(productid)
        // console.log(`product find${product1}`);
        await Product.findByIdAndUpdate(productid,{image,name:name,price:price,description:description,DiscountPercentage:DiscountPercentage})
        }catch(error){
            console.log(`error is edit post${error}`);
        }
        res.redirect('/admin/showproduct')

    },
    deletepost:async(req,res)=>{
        const productId = req.params.productId
        await Product.findByIdAndDelete(productId)
        res.redirect('/admin/showproduct')
    },

    categoryget:(req,res)=>{
        res.render('admin/category')
    },
    categorypost:(req,res)=>{
        res.render('admin/cotegory')
    },
    userlistget:(req,res)=>{
        res.render('admin/userlist')
    },
    userlistpost:(req,res)=>{
        res.render('admin/userlist')
    },
    bannerget:(req,res)=>{
        res.render('admin/banner')
    },
    bannerpost:(req,res)=>{
        res.render('admin/banner')
    },
    addadminget:(req,res)=>{
        res.render("admin/addadmin")
    },
    addadminpost:(req,res)=>{
        res.render('admin/addadmin')
    }

}