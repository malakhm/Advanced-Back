import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const designSchema = new Schema({
    images: {
        type: [String],
        required: true, 
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true, 
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true, 
    },
}, { timestamps: true });

export default model('designs', designSchema);
