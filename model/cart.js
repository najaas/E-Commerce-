const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    products: [{
        productId: {
            type: String,
            ref: 'products', 
            required: true
        },
        quantity: {
            type: Number,
            default: 1 
        }
    }]
});

module.exports = mongoose.model('Cart', cartSchema);

