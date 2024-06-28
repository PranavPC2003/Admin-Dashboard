import { Schema, model } from 'mongoose';

const teamsSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true
    },
    role:{
        type: String,
        // required: true
    },
    last_activity:{
        type: String,
        // required: true
    }
});
const Teams = model('teamss', teamsSchema); // Ensure the model name matches the collection name
export default Teams;