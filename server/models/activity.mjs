import { Schema, model } from 'mongoose';

const activitySchema = new Schema({
    activity: {
        type: String,
        required: true
    },
    User: {
        type: String,
        required: true
    },
    timestamp:{
        type: String,
        required: true
    }
});
const Activities = model('activity_data', activitySchema); // Ensure the model name matches the collection name
export default Activities;