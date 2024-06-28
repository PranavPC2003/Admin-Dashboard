import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
    order_title: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    
    timestamp:{
        type: String,
        required: true
    }
});

const Orders = model('my_order', orderSchema); // Ensure the model name matches the collection name
export default Orders;