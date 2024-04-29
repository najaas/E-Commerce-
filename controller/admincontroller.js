const {Product}=require('../model/datastore')
const categoryes=require('../model/category')
const order=require('../model/order')
const {user}=require('../model/datastore')
const { log } = require('console')

module.exports={
    adminget:(req,res)=>{
        res.render('admin/home')
    },
    adminpost:(req,res)=>{
        res.redirect('/admin/addproduct')
    },
    productget:async(req,res)=>{
        const category=await categoryes.find()
        res.render('admin/addproduct',{category})
    },
    productpost:async(req,res)=>{
           try{const {
            name,
            price,
            description,
            DiscountPercentage,
            category
        }=req.body
        if(req.files){
            var image = req.files.map(file=> file.filename);
            console.log(image);         
            console.log(req.files);
    
        }
    // const image =req.file.filename
    percentage = (price * DiscountPercentage ) / 100;
    finalPrice = price - percentage ;
        console.log(finalPrice);

    const newproduct=new Product({
        prizePercenttage:finalPrice,
        name,
        price,
        description,
        DiscountPercentage,
        image,
        category
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
        res.redirect('/admin/showproduct')
    },
    editproductget:async (req,res)=>{
        const producId = req.params.productid
        const product = await  Product.findById(producId)
        res.render('admin/editproduct',{product})
    },
    editproductpost:async(req,res)=>{
        try{
      const productid=req.params.productid;
    //   console.log(`params id ${productid}`
        const {name,price,description,DiscountPercentage}=req.body;
        percentage = (price * DiscountPercentage ) / 100;
        finalPrice = price - percentage ;

        if(req.file){
            var image = req.file.filename
            console.log(image);
        }

        // console.log(image,name,price,description,DiscountPercentage);
        const product1=await Product.findById(productid)
        // console.log(`product find${product1}`);
        await Product.findByIdAndUpdate(productid,{image,name:name,price:price,description:description,DiscountPercentage:DiscountPercentage,prizePercenttage:finalPrice,})
        }catch(error){
            console.log(`error is edit post${error}`);
        }
        res.redirect('/admin/showproduct')
  
    },
    deleteget:async(req,res)=>{
        const productId = req.params.productId
        console.log(productId);
        await Product.findByIdAndDelete(productId)
        res.redirect('/admin/showproduct')
    },
    userlistget:async(req,res)=>{
        const userlist=await user.find()
        console.log(userlist);
        res.render('admin/userlist',{userlist})
    },
    userlistpost:(req,res)=>{
        res.render('admin/userlist')
    },
    orderlistget:async(req,res)=>{
        const Order = await order.find().populate({
            path: 'items.productID',  // Assuming the path to the productID in each item
             // Optionally specify which product fields to fetch
        });  // const product= await order.findOne().populate('products.productID')
        // console.log(products);
        // console.log(Order);
        res.render("admin/orderlist",{Order})
    },
    orderlistpost:(req,res)=>{
        res.render('admin/orderlist')
    },


    updateorderpost:async (req, res) => {
        console.log("hi")
        const { orderId, status } = req.body;
        console.log(req.body)
        try {
            await order.updateOne({ _id: orderId }, { $set: { status: status } });
            res.send({ message: 'Order status updated successfully' });
        } catch (error) {
            console.error('Error updating order status:', error);
            res.status(500).send({ error: 'Failed to update order status' });
        }
}

}