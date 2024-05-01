const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Order Schema
const orderSchema = new Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'userlist'  // assuming there's a Customer model for referencing
    },
    items: [{
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'products'
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
      
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'shipped', 'cancelled' ,'delivered'],
        default: 'pending'
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    Address:{
        type: String,
        required: true
    },
    Username:{
        type:String
    },Userlastname:{
        type:String
    },Postcode:{
        type:String
    },Mobile:{
        type:String
    },City:{
        type:String
    },Country:{
        type:String
    }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
