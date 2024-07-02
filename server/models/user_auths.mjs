import { Schema, model } from 'mongoose';

const userAuth = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    image_src:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
const Users = model('user_auth', userAuth); // Ensure the model name matches the collection name
export default Users;