const mongoose=require('mongoose')


const connectdata=async()=>{



try{
    mongoose.connect("mongodb://localhost:27017/p-ecart")
    console.log('connected');

}catch(err){
    console.log(err,'err database');
}
}

module.exports=connectdata


   
    


