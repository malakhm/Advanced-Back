import mongoose from 'mongoose';

const { Schema, model } = mongoose;


const feedbackSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    }

}, {timestamps: true})

export default model('Feedback', feedbackSchema);