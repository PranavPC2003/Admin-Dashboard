import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    teams: {
        type: String,
        required: true
    },
    about_me: {
        type: String,
        required: true
    },
    image_src:{
        type: String,
        required: true
    }
    
});
const UsersData = model('userprofile', userSchema); // Ensure the model name matches the collection name
export default UsersData;